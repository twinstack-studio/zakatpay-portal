const jwt = require('jsonwebtoken');

const TOKEN_TTL = '30d';

function signToken(user) {
  return jwt.sign(
    { sub: String(user._id), email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_TTL }
  );
}

/**
 * Every /api/user route used to take the account's email straight from the
 * request body. Anyone could POST somebody else's address and read their
 * donation history, or write donations against their name. The email now
 * comes from a signed token instead, so it cannot be chosen by the caller.
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Please log in to continue.' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, email: payload.email, name: payload.name };
    return next();
  } catch (err) {
    const expired = err.name === 'TokenExpiredError';
    return res.status(401).json({
      success: false,
      expired,
      message: expired ? 'Your session expired. Please log in again.' : 'Invalid session.',
    });
  }
}

module.exports = { signToken, requireAuth };
