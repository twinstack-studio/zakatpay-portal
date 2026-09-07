/**
 * Vercel serverless entry point.
 *
 * Vercel invokes this module per request instead of running a long-lived
 * process, so it must export the app rather than call listen(). The database
 * connection is cached inside app.js so warm invocations reuse it.
 */
module.exports = require('../app');
