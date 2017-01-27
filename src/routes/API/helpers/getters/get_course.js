const keystone = require('keystone');
const Course = keystone.list('Course');

module.exports = (courseName, cb) => {
    if (!courseName) {
        return cb({
            error: 'missing courseName parameter',
        });
    }

    Course.model.findOne({
        name: new RegExp(courseName, 'i'),
        published: true,
    }, {}, (err, courseData) => {
        if (err) {
            return cb(err);
        }
        else if (!courseData) {
            return cb({
                message: 'Course not found',
                status: 404,
                success: false,
            });
        }

        return cb(null, courseData);
    });
};
