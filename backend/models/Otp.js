const mongoose = require('mongoose');

/**
 * OTP codes, kept in the database rather than in process memory.
 *
 * In-process storage only works when there is exactly one long-lived server.
 * On a serverless host each request can land on a different instance, so a
 * code issued by one would be unknown to the instance asked to verify it and
 * every login would fail. Storing them here also means a restart or redeploy
 * no longer throws away codes people are in the middle of using.
 */
const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },

  // Only the hash is stored - a database dump should not hand out live codes.
  hash: { type: String, required: true },

  attempts: { type: Number, default: 0 },

  // Mongo deletes the document once this passes, so expired codes clean
  // themselves up without needing a sweeper process.
  expiresAt: { type: Date, required: true, index: { expires: 0 } },

  // Send throttling lives here too, so limits hold across instances.
  sendCount: { type: Number, default: 0 },
  windowStart: { type: Date, default: Date.now },
  lastSentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Otp || mongoose.model('Otp', OtpSchema);
