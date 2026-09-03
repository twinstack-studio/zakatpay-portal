const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 1. SEND OTP (SPAM FIX ADDED)
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[email] = otp; 

  try {
    await transporter.sendMail({
      from: `"ZakatPay Support" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER, // Spam fix header
      subject: 'Your ZakatPay Verification Code',
      // Plain text added to bypass spam filters
      text: `Your secure verification code for ZakatPay is: ${otp}. Please do not share this code.`, 
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #ec4899; text-align: center;">ZakatPay Verification</h2>
          <p style="color: #4b5563; font-size: 16px;">Hello,</p>
          <p style="color: #4b5563; font-size: 14px;">Please use the following 4-digit code to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #111827; background: #f3f4f6; padding: 15px 30px; border-radius: 8px; letter-spacing: 8px;">${otp}</span>
          </div>
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `
    });
    console.log(`Backend: Real OTP sent to ${email} (Anti-Spam Applied)`);
    res.json({ success: true, message: "OTP Sent Successfully" });
  } catch (error) {
    console.error("OTP Sending Error:", error);
    return res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email]; 
    res.json({ success: true, message: "OTP Verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, message: "Account already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ success: true, message: "Account Created Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error during registration" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Account not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid password" });

    res.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error during login" });
  }
});

// ===============================================
// NAYA ROUTE: REAL-TIME GOOGLE LOGIN KE LIYE
// ===============================================
router.post('/google-login', async (req, res) => {
  try {
    const { name, email, googleId } = req.body;
    let user = await User.findOne({ email });

    // Agar user pehle se nahi hai, toh automatic register kar do
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      // Google user ke liye random secure password bana diya hai
      const hashedPassword = await bcrypt.hash(googleId + process.env.JWT_SECRET, salt); 
      user = new User({ name, email, password: hashedPassword });
      await user.save();
    }

    res.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error("Google Login Backend Error:", err);
    res.status(500).json({ success: false, message: "Google Login Failed on Server" });
  }
});

module.exports = router;