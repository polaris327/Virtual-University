const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';

const createJwtToken = payload => jwt.sign({ // Creates a new JWT
  data: payload,
  exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365), // Expiration date one year ahead
}, JWT_SECRET, {});

module.exports = {
  createJwtToken,
  tokenSecret: JWT_SECRET,
  jwt,
};
