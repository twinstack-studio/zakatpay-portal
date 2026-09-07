require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

/**
 * Builds the Express app. Kept separate from server.js so the same app can be
 * exported to a serverless host (api/index.js) as well as listened on directly.
 */

const app = express();
app.set('trust proxy', 1); // hosts sit behind a proxy

/* ----------------------------------------------------------------- CORS */

const allowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);               // curl, health checks
    if (allowed.length === 0) return cb(null, true);  // dev default
    if (allowed.includes(origin)) return cb(null, true);
    if (process.env.ALLOW_VERCEL_PREVIEWS === 'true' &&
        /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) {
      return cb(null, true);
    }
    return cb(new Error(`Origin ${origin} is not allowed`));
  },
  credentials: true,
}));

app.use(express.json({ limit: '100kb' }));

/* ------------------------------------------------------ database access */

/**
 * On a serverless host every request may start a fresh module scope, so a
 * naive mongoose.connect() would open a new pool per request and quickly
 * exhaust the Atlas connection limit. The promise is cached on globalThis,
 * which does survive between invocations on a warm instance.
 */
let cached = globalThis.__zakatpayMongo;
if (!cached) cached = globalThis.__zakatpayMongo = { conn: null, promise: null };

async function connectDb() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not set');
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, {
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Every route below needs the database, so connect (or reuse) before handling.
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (err) {
    console.error('DB connect failed:', err.message);
    res.status(503).json({ success: false, message: 'Service is starting up. Please try again.' });
  }
});

/* --------------------------------------------------------------- routes */

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

module.exports = app;
module.exports.connectDb = connectDb;
module.exports.allowedOrigins = allowed;
