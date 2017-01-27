const userController = require('../controllers/user');

module.exports = (app) => {
  app.post('/API/user/', (req, res, next) => {
    /* Register a new user
        Params:
        - username: STRING.
        - password: STRING.
        - email: STRING.
        - name: STRING.
    */
    userController.register({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
    }, (err, user) => {
      if (err) {
        return next(err);
      }

      return res.status(201).send(user);
    });
  });

  app.post('/API/login/', (req, res, next) => {
    /* Authenticate user. Returns JWT
        Params:
        - username: STRING.
        - password: STRING.
      If no params are provided, it tries to refresh auth token. Must provide old JWT.
    */
    if (!Object.keys(req.body).length) {
      return userController.refreshToken(req.headers.jwt, (err, data) => {
        if (err) {
          return next(err);
        }

        return res.status(data.status).send(data);
      });
    }

    userController.login({
      username: req.body.username,
      password: req.body.password,
    }, (err, auth) => {
      if (err) {
        return next(err);
      }

      return res.status(200).send(auth);
    });
  });
};
