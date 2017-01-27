const keystone = require('keystone');
const Course = keystone.list('Course');

module.exports = (cb) => {
    Course.model.find({
        published: true,
    }, {
        _id: 0,
        __v: 0
    }, (err, courses) => {
        if (err) {
            return cb({
                message: 'Internal Server Error',
                status: 500,
                success: false,
            });
        }

        return cb(null, {
            success: true,
            status: 200,
            data: courses,
        });
    });
};
