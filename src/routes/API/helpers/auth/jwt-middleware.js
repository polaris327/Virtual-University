const jwt = require('jsonwebtoken');
const jwtTool = require('./jwt');

module.exports = (req, res, next) => {
  if (req.headers.jwt) {
    // If a JWT is present, it verifies it
    return jwt.verify(req.headers.jwt, jwtTool.tokenSecret, (err, decoded) => {
      if (err) {
        // If JWT is malformed or invalid, returns 403
        return next({ message: 'Invalid token', status: 403 });
      }

      // Else, it grants access to the ID user in DB.
      req.user = decoded.data.id; // eslint-disable-line no-param-reassign

      return next();
    });
  }

  return next();
};
