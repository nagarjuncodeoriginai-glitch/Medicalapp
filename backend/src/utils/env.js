const logger = require('./logger');

const REQUIRED = ['MONGODB_URI', 'JWT_SECRET'];

function validateEnv() {
  const missing = REQUIRED.filter((key) => !process.env[key]);
  if (missing.length) {
    logger.error(`Missing required env vars: ${missing.join(', ')}`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      logger.warn('Continuing in non-production mode with missing env vars. Do NOT deploy like this.');
    }
  }
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 16) {
    logger.warn('JWT_SECRET is short (<16 chars). Use a long random string in production.');
  }
}

module.exports = { validateEnv };
