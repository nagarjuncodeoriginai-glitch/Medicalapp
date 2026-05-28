const logger = require('./logger');

const REQUIRED = ['MONGODB_URI', 'JWT_SECRET'];

function validateEnv() {
  const missing = REQUIRED.filter((key) => !process.env[key]);
  if (missing.length) {
    // Loud, actionable message - this is the #1 cause of "500 on /auth/login"
    logger.error('====================================================================');
    logger.error(`Missing required env vars: ${missing.join(', ')}`);
    logger.error('Fix: cp backend/.env.example backend/.env  and fill in the values.');
    logger.error('Then restart the API. The /api/auth routes will keep failing until then.');
    logger.error('====================================================================');
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 16) {
    logger.warn('JWT_SECRET is short (<16 chars). Use a long random string in production.');
  }
}

module.exports = { validateEnv };
