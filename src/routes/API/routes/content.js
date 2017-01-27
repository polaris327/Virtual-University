const checkAuth = require('../helpers/auth/check-auth');
const getChapterContent = require('../controllers/courses/get_content');

module.exports = (app) => {
    app.get('/API/course/chapter/media/get?', checkAuth, (req, res, next) => {
        getChapterContent({
            courseName: req.query.courseName,
            chapterName: req.query.chapterName,
            fileType: req.query.fileType,
        }, req.user, (err, data) => {
            if (err) {
                return next(err);
            }

            return res.status(data.status).send(data);
        });
    });
};
