module.exports = (req, res, next) => {
  if (req.user) {
    return next();
  }

  return next({ message: 'Unauthorized', status: 403 });
};
