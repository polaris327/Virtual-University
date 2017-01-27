const checkAuth = require('../helpers/auth/check-auth');
const getCourses = require('../controllers/courses/get_courses');
const subscribeToCourse = require('../controllers/courses/subscribe');
const getCourseOverview = require('../controllers/courses/get_overview');

module.exports = (app) => {
    app.get('/API/courses/', (req, res, next) => {
        getCourses((err, data) => {
            if (err) {
                return next(err);
            }

            return res.status(data.status).send(data);
        });
    });

    app.get('/API/courses/overview/get?', checkAuth, (req, res, next) => {
        getCourseOverview(req.query, req.user, (err, data) => {
            if (err) {
                return next(err);
            }

            return res.status(data.status).json(data);
        });
    });

    app.put('/API/user/courses/', checkAuth, (req, res, next) => {
        // Subscribe to course.
        subscribeToCourse({
            courseName: req.body.courseName,
        }, req.user, (err, success) => {
            if (err) {
                return next(err);
            }

            return res.status(success.status).send(success);
        });
    });
};
