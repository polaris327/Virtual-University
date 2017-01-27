var keystone = require('keystone');
var Course = keystone.list('Course').model;
var User = keystone.list('User').model;

module.exports = (course, userId, cb) => {
    const courseName = course.courseName;

    if (!courseName) {
        return cb({
            message: 'Missing required parameters',
            status: 400,
            success: false,
        });
    }

    Course.findOne({
        name: courseName,
        published: true,
    }, (err, courseData) => {
        if (err) {
            return cb({
                message: 'Internal Server Error',
                status: 400,
                success: false,
            });
        }
        else if (!courseData) {
            return cb({
                message: 'That course doesn\'t exist',
                status: 404,
                success: false,
            })
        }

        User.findOneAndUpdate({
            _id: userId,
        }, {
            $push: {
                courses: courseData._id,
            },
        }, (err, user) => {
            if (err) {
                return cb({
                    message: 'Internal Server Error',
                    status: 400,
                    success: false,
                });
            }

            return cb(null, {
                message: 'Successfuly subscribed to the ' + courseData.name + ' course',
                success: true,
                status: 200,
            });
        });
    });
};
