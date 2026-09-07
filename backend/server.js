require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { verifyMailer } = require('./config/mailer');

const app = express();
app.set('trust proxy', 1); // hosts (Render/Railway/Fly) sit behind a proxy

/* ----------------------------------------------------------------- CORS */

// Previously `cors()` allowed every origin on the internet. Only the sites we
// actually ship should be able to call this API.
const allowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    // No Origin header: curl, health checks, same-origin server calls.
    if (!origin) return cb(null, true);
    if (allowed.length === 0) return cb(null, true); // dev default
    if (allowed.includes(origin)) return cb(null, true);
    // Any Vercel preview deployment of this project.
    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin) && process.env.ALLOW_VERCEL_PREVIEWS === 'true') {
      return cb(null, true);
    }
    return cb(new Error(`Origin ${origin} is not allowed`));
  },
  credentials: true,
}));

app.use(express.json({ limit: '100kb' }));

/* -------------------------------------------------------------- startup */

const required = ['MONGO_URI', 'JWT_SECRET'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`❌ Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

verifyMailer();

/* --------------------------------------------------------------- routes */

// Hosting platforms ping this to decide whether the service is alive, and it
// is a quick way to check the API is reachable from a phone.
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: Math.round(process.uptime()),
  });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err && /not allowed/.test(err.message || '')) {
    return res.status(403).json({ success: false, message: 'Origin not allowed.' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Something went wrong.' });
});

const PORT = process.env.PORT || 5001;
// 0.0.0.0 so the service is reachable inside a container / from other devices
// on the network, not just from this machine.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`ZakatPay API listening on port ${PORT}`);
  console.log(`Allowed origins: ${allowed.length ? allowed.join(', ') : '(all - set ALLOWED_ORIGINS in production)'}`);
});
