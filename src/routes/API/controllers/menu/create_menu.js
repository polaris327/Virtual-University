const keystone = require('keystone');
const async = require('async');

const Course = keystone.list('Course');
const Chapter = keystone.list('Chapter');
const User = keystone.list('User');

module.exports = (params, userId, cb) => {
    /* 
     *  Returns the menu of the required chapter
     */
    const course = params.course;

    if (!course) {
        return cb({
            message: 'Missing required parameters',
            status: 400,
            success: false,
        });
    }

    const menu = {};


    Course.model.findOne({
        name: course,
        published: true,
    }, {}, (err, courseData) => {
        if (err) {
            return cb({
                message: 'Internal Server Error',
                status: 500,
                success: false,
            });
        }
        else if (!courseData) {
            return cb({
                message: 'That course doesn\'t exist',
                status: 404,
                success: false,
            });
        }

        User.model.findOne({
            _id: userId,
            courses: courseData._id,
        }, {}, (err, isOwned) => {
            if (err) {
                return cb({
                    message: 'Internal Server Error',
                    status: 500,
                    success: false,
                });
            }
            else if (!isOwned) {
                return cb({
                    message: 'You are not subscribed to this course',
                    status: 401,
                    success: false,
                });
            }

            Chapter.model.find().where('course', courseData._id).where('published', true)
                .exec((err, chaptersData) => {
                    if (err) {
                        return cb({
                            message: 'Internal Server Error',
                            status: 500,
                            success: false,
                        });
                    }

                    menu.courseName = courseData.name;
                    menu.chapters = chaptersData.map(item => item.name);

                    return cb(null, {
                        status: 200,
                        success: true,
                        data: menu,
                    });
                });
        });
    });
};
