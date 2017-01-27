const keystone = require('keystone');
const Course = keystone.list('Course');
const User = keystone.list('User');

module.exports = (query, userId, cb) => {
    const courseName = query.courseName;

    if (!courseName) {
        return cb({
            message: 'Missing required parameters',
            status: 400,
            success: false,
        });
    }

    Course.model.findOne({
        name: courseName,
        published: true,
    }, {}, (err, courseData) => {
        if (err) {
            return cb({
                message: 'Internal Server Error',
                status: 500,
                success: false,
            });
        }

        if (!courseData) {
            return cb({
                message: 'That course doesn\'t exist',
                status: 404,
                success: false,
            });
        }

        User.model.findOne({
            _id: userId,
            courses: courseData._id,
        }, {}, (err, userData) => {
            if (err) {
                return cb({
                    message: 'Internal Server Error',
                    status: 500,
                    success: false,
                });
            }

            if (!userData) {
                return cb({
                    message: 'You are not subscribed to that course',
                    status: 401,
                    success: false,
                });
            }

            return cb(null, {
                data: courseData.homeText,
                status: 200,
                success: true,
            });
        });
    });
};
