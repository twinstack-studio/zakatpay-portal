const crypto = require('crypto');

/**
 * OTP storage with expiry, guess limits and send throttling.
 *
 * The previous version was a bare object: codes never expired, could be
 * guessed an unlimited number of times, and /send-otp could be called in a
 * loop to mail-bomb anyone (and burn the Gmail daily quota).
 *
 * This is in-process memory, which is fine for a single instance. If the API
 * is ever scaled to more than one instance, move this to Redis or a Mongo
 * collection with a TTL index - otherwise a user can be issued a code by one
 * instance and verified by another that has never seen it.
 */

const OTP_TTL_MS = 5 * 60 * 1000;      // a code is valid for 5 minutes
const MAX_ATTEMPTS = 5;                 // wrong guesses before the code dies
const RESEND_COOLDOWN_MS = 45 * 1000;   // minimum gap between sends
const MAX_SENDS_PER_WINDOW = 5;         // per email
const SEND_WINDOW_MS = 30 * 60 * 1000;  // 30 minutes

const codes = new Map();   // email -> { hash, expiresAt, attempts }
const sends = new Map();   // email -> { count, windowStart, lastSentAt }

const normalise = (email) => String(email || '').trim().toLowerCase();

// Codes are stored hashed - a memory dump or stray log should not hand out
// working OTPs.
const hash = (code) => crypto.createHash('sha256').update(String(code)).digest('hex');

function generateCode() {
  // 6 digits, crypto-random. A 4-digit code has only 10k possibilities.
  return String(crypto.randomInt(0, 1000000)).padStart(6, '0');
}

/**
 * @returns {{ok: true} | {ok: false, reason: string, retryAfter: number}}
 */
function canSend(email) {
  const key = normalise(email);
  const now = Date.now();
  const rec = sends.get(key);
  if (!rec) return { ok: true };

  if (now - rec.windowStart > SEND_WINDOW_MS) return { ok: true };

  const sinceLast = now - rec.lastSentAt;
  if (sinceLast < RESEND_COOLDOWN_MS) {
    return {
      ok: false,
      reason: 'cooldown',
      retryAfter: Math.ceil((RESEND_COOLDOWN_MS - sinceLast) / 1000),
    };
  }
  if (rec.count >= MAX_SENDS_PER_WINDOW) {
    return {
      ok: false,
      reason: 'limit',
      retryAfter: Math.ceil((SEND_WINDOW_MS - (now - rec.windowStart)) / 1000),
    };
  }
  return { ok: true };
}

function recordSend(email) {
  const key = normalise(email);
  const now = Date.now();
  const rec = sends.get(key);
  if (!rec || now - rec.windowStart > SEND_WINDOW_MS) {
    sends.set(key, { count: 1, windowStart: now, lastSentAt: now });
  } else {
    rec.count += 1;
    rec.lastSentAt = now;
  }
}

function issue(email) {
  const key = normalise(email);
  const code = generateCode();
  codes.set(key, { hash: hash(code), expiresAt: Date.now() + OTP_TTL_MS, attempts: 0 });
  return code;
}

/**
 * @returns {{ok: true} | {ok: false, reason: 'missing'|'expired'|'locked'|'mismatch', left?: number}}
 */
function verify(email, code) {
  const key = normalise(email);
  const rec = codes.get(key);
  if (!rec) return { ok: false, reason: 'missing' };

  if (Date.now() > rec.expiresAt) {
    codes.delete(key);
    return { ok: false, reason: 'expired' };
  }
  if (rec.attempts >= MAX_ATTEMPTS) {
    codes.delete(key);
    return { ok: false, reason: 'locked' };
  }

  const supplied = hash(String(code || '').trim());
  const a = Buffer.from(supplied);
  const b = Buffer.from(rec.hash);
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!match) {
    rec.attempts += 1;
    return { ok: false, reason: 'mismatch', left: MAX_ATTEMPTS - rec.attempts };
  }

  codes.delete(key);
  return { ok: true };
}

// Drop expired entries so the maps cannot grow without bound.
const sweeper = setInterval(() => {
  const now = Date.now();
  for (const [k, v] of codes) if (now > v.expiresAt) codes.delete(k);
  for (const [k, v] of sends) if (now - v.windowStart > SEND_WINDOW_MS) sends.delete(k);
}, 60 * 1000);
sweeper.unref?.();

module.exports = { canSend, recordSend, issue, verify, OTP_TTL_MS, MAX_ATTEMPTS };
