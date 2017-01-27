const keystone = require('keystone');
const Chapter = keystone.list('Chapter');
const getCourse = require('./get_course');

module.exports = (opts, cb) => {
    const courseName = opts.courseName;
    const chapterName = opts.chapterName;
    const includeCourse = opts.includeCourse;

    if (!(courseName, chapterName)) {
        return cb({
            error: 'Missing required parameter',
        });
    }

    getCourse(courseName, (err, courseData) => {
        if (err) {
            return cb(err);
        }

        Chapter.model.findOne({
            name: new RegExp(chapterName, 'i'),
            course: courseData._id,
            published: true,
        }, {}, (err, chapterData) => {
            if (err) {
                return cb(err);
            }
            else if (!chapterData) {
                return cb({
                    message: 'Chapter not found',
                    status: 404,
                    success: false,
                });
            }

            if (includeCourse) {
                return cb(null, {
                    course: courseData,
                    chapter: chapterData,
                });
            }
            else {
                return cb(null, chapterData);
            }
        });
    });
};
