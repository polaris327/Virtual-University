const getProfile = require('../controllers/profile/get-profile');
const updateProfile = require('../controllers/profile/update-profile');
const checkAuth = require('../helpers/auth/check-auth');

module.exports = (app) => {
  app.get('/API/user/profile/', checkAuth, (req, res, next) => {
    getProfile(req.user, (err, data) => {
      if (err) {
        return next(err);
      }

      return res.status(data.status).send(data);
    })
  });

  app.put('/API/user/profile/', checkAuth, (req, res, next) => {
    if (!(req.body.email || req.body.name || req.body.birthday)) {
      return next({
        message: 'Missing parameters',
        status: 400,
        success: false,
      });
    }

    updateProfile({
      email: req.body.email,
      name: req.body.name,
      birthday: req.body.birthday,
    }, req.user, (err, data) => {
      if (err) {
        return next(err);
      }

      return res.status(data.status).send(data);
    });
  });
};
