const crypto = require('crypto');
const Otp = require('../models/Otp');

/**
 * OTP issuing and verification, backed by MongoDB.
 *
 * This used to be a Map in process memory. That works only for a single
 * always-on server: on a serverless host the instance that issues a code is
 * often not the one asked to verify it, so every login would fail with
 * "incorrect code". Keeping the records in Mongo makes the flow correct
 * regardless of how many instances are running, and survives redeploys.
 */

const OTP_TTL_MS = 5 * 60 * 1000;      // a code is valid for 5 minutes
const MAX_ATTEMPTS = 5;                 // wrong guesses before the code dies
const RESEND_COOLDOWN_MS = 45 * 1000;   // minimum gap between sends
const MAX_SENDS_PER_WINDOW = 5;         // per email
const SEND_WINDOW_MS = 30 * 60 * 1000;  // 30 minutes

const normalise = (email) => String(email || '').trim().toLowerCase();
const hash = (code) => crypto.createHash('sha256').update(String(code)).digest('hex');

function generateCode() {
  // 6 digits, crypto-random. A 4-digit code has only 10k possibilities.
  return String(crypto.randomInt(0, 1000000)).padStart(6, '0');
}

/** @returns {{ok: true} | {ok: false, reason: 'cooldown'|'limit', retryAfter: number}} */
async function canSend(email) {
  const rec = await Otp.findOne({ email: normalise(email) }).lean();
  if (!rec) return { ok: true };

  const now = Date.now();
  if (now - new Date(rec.windowStart).getTime() > SEND_WINDOW_MS) return { ok: true };

  const sinceLast = now - new Date(rec.lastSentAt).getTime();
  if (sinceLast < RESEND_COOLDOWN_MS) {
    return { ok: false, reason: 'cooldown', retryAfter: Math.ceil((RESEND_COOLDOWN_MS - sinceLast) / 1000) };
  }
  if (rec.sendCount >= MAX_SENDS_PER_WINDOW) {
    const left = SEND_WINDOW_MS - (now - new Date(rec.windowStart).getTime());
    return { ok: false, reason: 'limit', retryAfter: Math.ceil(left / 1000) };
  }
  return { ok: true };
}

/** Issue a code, and record the send against the throttle window. */
async function issue(email) {
  const key = normalise(email);
  const code = generateCode();
  const now = new Date();

  const existing = await Otp.findOne({ email: key }).lean();
  const windowExpired =
    !existing || now.getTime() - new Date(existing.windowStart).getTime() > SEND_WINDOW_MS;

  const set = {
    email: key,
    hash: hash(code),
    attempts: 0,
    expiresAt: new Date(now.getTime() + OTP_TTL_MS),
    lastSentAt: now,
  };
  if (windowExpired) {
    set.sendCount = 1;
    set.windowStart = now;
  }

  await Otp.findOneAndUpdate(
    { email: key },
    windowExpired ? { $set: set } : { $set: set, $inc: { sendCount: 1 } },
    { upsert: true }
  );

  return code;
}

/** @returns {{ok: true} | {ok: false, reason: 'missing'|'expired'|'locked'|'mismatch', left?: number}} */
async function verify(email, code) {
  const key = normalise(email);
  const rec = await Otp.findOne({ email: key });
  if (!rec) return { ok: false, reason: 'missing' };

  if (Date.now() > new Date(rec.expiresAt).getTime()) {
    await Otp.deleteOne({ email: key });
    return { ok: false, reason: 'expired' };
  }
  if (rec.attempts >= MAX_ATTEMPTS) {
    await Otp.deleteOne({ email: key });
    return { ok: false, reason: 'locked' };
  }

  const a = Buffer.from(hash(String(code || '').trim()));
  const b = Buffer.from(rec.hash);
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!match) {
    rec.attempts += 1;
    await rec.save();
    return { ok: false, reason: 'mismatch', left: MAX_ATTEMPTS - rec.attempts };
  }

  // Clear the code but keep nothing else around - a fresh send starts over.
  await Otp.deleteOne({ email: key });
  return { ok: true };
}

module.exports = { canSend, issue, verify, OTP_TTL_MS, MAX_ATTEMPTS };
