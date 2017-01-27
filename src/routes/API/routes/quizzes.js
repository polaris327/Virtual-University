const checkAuth = require('../helpers/auth/check-auth');
const getQuizzes = require('../controllers/quizzes/get_quizzes');

module.exports = (app) => {
    app.get('/API/course/quiz?', checkAuth, (req, res, next) => {
        getQuizzes({
            courseName: req.query.courseName,
            chapter: req.query.chapterName,
            isAssignment: req.query.isAssignment,
        }, req.user, (err, questions) => {
            if (err) {
                return next(err);
            }

            return res.status(questions.status).send(questions);
        });
    });
};
