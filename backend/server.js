/**
 * Local / long-running entry point. Vercel uses api/index.js instead, which
 * exports the same app without listening on a port.
 */
require('dotenv').config({ quiet: true });

const app = require('./app');
const { verifyMailer } = require('./config/mailer');

const required = ['MONGO_URI', 'JWT_SECRET'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`❌ Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const PORT = process.env.PORT || 5001;

(async () => {
  try {
    await app.connectDb();
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }

  // Warm the SMTP pool so the first user does not pay the handshake.
  await verifyMailer();

  // 0.0.0.0 so the API is reachable from other devices on the network and
  // from inside a container, not only from this machine.
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZakatPay API listening on port ${PORT}`);
    console.log(`Allowed origins: ${app.allowedOrigins.length ? app.allowedOrigins.join(', ') : '(all - set ALLOWED_ORIGINS in production)'}`);
  });
})();
