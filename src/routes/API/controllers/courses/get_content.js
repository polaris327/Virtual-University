const keystone = require('keystone');
const User = keystone.list('User');
const File = keystone.list('File');
const getChapterData = require('../../helpers/getters/get_chapter');

module.exports = (opts, userId, cb) => {
    const courseName = opts.courseName;
    const chapterName = opts.chapterName;
    const fileType = opts.fileType || ['Video', 'PDF'];

    const query = {};

    if (!(courseName && chapterName)) {
        return cb({
            message: 'Missing required parameter',
            success: false,
            status: 400,
        });
    }

    getChapterData({
        courseName,
        chapterName,
        includeCourse: true,
    }, (err, data) => {
        if (err) {
            return cb({
                message: 'Internal Server Error',
                success: false,
                status: 500,
            });
        }

        User.model.findOne({
            _id: userId,
            courses: data.course._id,
        }, {}, (err, user) => {
            if (err) {
                return cb({
                    message: 'Internal Server Error',
                    status: 500,
                    success: false,
                });
            }
            else if (!user) {
                return cb({
                    message: 'You\'re not subscribed to that course',
                    status: 401,
                    success: false,
                });
            }

            query.course = data.course._id;
            query.chapter = data.chapter._id;
            query.type = Array.isArray(fileType) ? {
                $in: fileType,
            } : fileType;

            File.model.find(query, {}, (err, fileData) => {
                if (err) {
                    return cb({
                        message: 'Internal Server Error',
                        success: false,
                        status: 500,
                    });
                }

                return cb(null, {
                    data: fileData,
                    success: true,
                    status: 200,
                });
            });
        });
    });
};
