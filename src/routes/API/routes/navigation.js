const checkAuth = require('../helpers/auth/check-auth');
const getMenu = require('../controllers/menu/create_menu');

module.exports = (app) => {
    app.get('/API/nav/get?', checkAuth, (req, res, next) => {
        getMenu({
            course: req.query.courseName,
        }, req.user, (err, menu) => {
            if (err) {
                return next(err);
            }

            res.status(menu.status).send(menu);
        });
    });
};
