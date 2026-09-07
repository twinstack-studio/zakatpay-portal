const nodemailer = require('nodemailer');

/**
 * A POOLED transporter.
 *
 * The previous setup created a fresh SMTP connection for every OTP, so each
 * send paid a full DNS + TCP + TLS handshake with Gmail before the mail even
 * started moving - typically 1.5-3s of the delay users felt. With a pool the
 * connection is opened once and reused, so later sends are usually well under
 * a second.
 */
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
  // Keep the socket alive between OTPs instead of tearing it down.
  connectionTimeout: 10000,
  greetingTimeout: 8000,
  socketTimeout: 15000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Open a connection at boot so the first real user does not pay the handshake.
 * Also surfaces a bad EMAIL_USER/EMAIL_PASS immediately at startup rather than
 * silently failing on someone's first login attempt.
 */
async function verifyMailer() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️  EMAIL_USER / EMAIL_PASS not set - OTP email will fail.');
    return false;
  }
  try {
    await transporter.verify();
    console.log('✅ Mail server ready (pooled connection warm)');
    return true;
  } catch (err) {
    console.error('❌ Mail server login failed:', err.message);
    console.error('   For Gmail you must use a 16-character App Password,');
    console.error('   not your normal account password.');
    return false;
  }
}

function otpEmail(otp) {
  return {
    subject: 'Your ZakatPay Verification Code',
    text: `Your ZakatPay verification code is ${otp}. It expires in 5 minutes. Do not share this code with anyone.`,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #ec4899; text-align: center; margin: 0 0 8px;">ZakatPay</h2>
        <p style="color: #6b7280; text-align: center; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 24px;">Digital Portal</p>
        <p style="color: #4b5563; font-size: 15px;">Use this code to verify your email address:</p>
        <div style="text-align: center; margin: 28px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #111827; background: #f3f4f6; padding: 16px 28px; border-radius: 10px; letter-spacing: 10px;">${otp}</span>
        </div>
        <p style="color: #4b5563; font-size: 13px;">This code expires in <strong>5 minutes</strong>. Never share it with anyone - ZakatPay staff will never ask you for it.</p>
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  };
}

module.exports = { transporter, verifyMailer, otpEmail };
