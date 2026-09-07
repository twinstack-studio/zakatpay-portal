const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { transporter, otpEmail } = require('../config/mailer');
const otpStore = require('../utils/otpStore');
const { signToken } = require('../middleware/auth');

const cleanEmail = (e) => String(e || '').trim().toLowerCase();
const looksLikeEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

/* ------------------------------------------------------------ send OTP */

router.post('/send-otp', async (req, res) => {
  const email = cleanEmail(req.body.email);
  if (!looksLikeEmail(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  const gate = await otpStore.canSend(email);
  if (!gate.ok) {
    return res.status(429).json({
      success: false,
      retryAfter: gate.retryAfter,
      message: gate.reason === 'cooldown'
        ? `Please wait ${gate.retryAfter}s before requesting another code.`
        : 'Too many codes requested. Please try again later.',
    });
  }

  // issue() also records the send against the throttle window.
  const code = await otpStore.issue(email);

  try {
    const mail = otpEmail(code);
    await transporter.sendMail({
      from: `"ZakatPay" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    res.json({ success: true, message: 'Verification code sent.' });
  } catch (err) {
    console.error('OTP send failed:', err.message);
    res.status(502).json({
      success: false,
      message: 'Could not send the email right now. Please try again in a moment.',
    });
  }
});

/* ---------------------------------------------------------- verify OTP */

router.post('/verify-otp', async (req, res) => {
  const email = cleanEmail(req.body.email);
  const result = await otpStore.verify(email, req.body.otp);

  if (result.ok) return res.json({ success: true, message: 'Email verified.' });

  const messages = {
    missing: 'No code was requested for this email. Please request a new one.',
    expired: 'That code has expired. Please request a new one.',
    locked: 'Too many incorrect attempts. Please request a new code.',
    mismatch: result.left > 0
      ? `Incorrect code. ${result.left} attempt${result.left === 1 ? '' : 's'} left.`
      : 'Incorrect code. Please request a new one.',
  };
  res.status(400).json({ success: false, reason: result.reason, message: messages[result.reason] });
});

/* ----------------------------------------------------------- register */

router.post('/register', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = cleanEmail(req.body.email);
    const password = String(req.body.password || '');

    if (!name) return res.status(400).json({ success: false, message: 'Please enter your name.' });
    if (!looksLikeEmail(email)) return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
    }

    if (await User.findOne({ email })) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const user = await new User({ name, email, password: hashedPassword }).save();

    res.json({
      success: true,
      message: 'Account created.',
      token: signToken(user),
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ success: false, message: 'Could not create the account. Please try again.' });
  }
});

/* -------------------------------------------------------------- login */

router.post('/login', async (req, res) => {
  try {
    const email = cleanEmail(req.body.email);
    const password = String(req.body.password || '');
    const user = await User.findOne({ email });

    // Same message either way, so this cannot be used to discover which
    // addresses have accounts.
    const invalid = () =>
      res.status(401).json({ success: false, message: 'Incorrect email or password.' });

    if (!user) return invalid();
    if (!(await bcrypt.compare(password, user.password))) return invalid();

    res.json({
      success: true,
      token: signToken(user),
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, message: 'Could not sign you in. Please try again.' });
  }
});

/* ------------------------------------------------------- google login */

/**
 * The browser sends the Google access token, NOT the profile.
 *
 * Previously the client posted {name, email, googleId} and the server trusted
 * them, so anyone could POST a stranger's address to this endpoint and be
 * handed a valid session for their account. The token is now exchanged with
 * Google here, server-side, and only the identity Google returns is used.
 */
router.post('/google-login', async (req, res) => {
  try {
    const accessToken = String(req.body.accessToken || '');
    if (!accessToken) {
      return res.status(400).json({ success: false, message: 'Google sign-in failed. Please try again.' });
    }

    const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!profileRes.ok) {
      return res.status(401).json({ success: false, message: 'Google could not verify that sign-in.' });
    }

    const profile = await profileRes.json();
    const email = cleanEmail(profile.email);
    if (!looksLikeEmail(email) || profile.email_verified === false) {
      return res.status(401).json({ success: false, message: 'That Google account has no verified email.' });
    }
    const name = String(profile.name || '').trim() || email.split('@')[0];

    let user = await User.findOne({ email });
    if (!user) {
      const random = require('crypto').randomBytes(32).toString('hex');
      const hashedPassword = await bcrypt.hash(random, await bcrypt.genSalt(10));
      user = await new User({ name, email, password: hashedPassword }).save();
    }

    res.json({
      success: true,
      token: signToken(user),
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Google login error:', err.message);
    res.status(500).json({ success: false, message: 'Google sign-in failed. Please try again.' });
  }
});

module.exports = router;
