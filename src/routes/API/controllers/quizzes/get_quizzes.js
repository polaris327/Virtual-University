const keystone = require('keystone');
const User = keystone.list('User');
const Quiz = keystone.list('Quiz');
const Course = keystone.list('Course');
const Chapter = keystone.list('Chapter');
const Question = keystone.list('Question');

module.exports = (query, userId, cb) => {
    const courseName = query.courseName;
    const chapter = query.chapter;
    const isAssignment = query.isAssignment === 'true';

    if (!(courseName && chapter)) {
        return cb({
            message: 'Missing required parameter',
            status: 400,
            success: false,
        });
    }

    Course.model.findOne({
        name: {
            $regex: new RegExp(courseName, 'i'),
        },
    }, {
        _id: 1
    }, (err, courseData) => {
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
        }, {}, (err, userData) => {
            if (err) {
                return cb({
                    message: 'Internal Server Error',
                    status: 500,
                    success: false,
                });
            }
            else if (!userData) {
                return cb({
                    message: 'You are not suscribed to that course',
                    status: 401,
                    success: false,
                });
            }

            Chapter.model.findOne({
                course: courseData._id,
                name: {
                    $regex: new RegExp(chapter, 'i'),
                },
            }, {}, (err, chapterData) => {
                if (err) {
                    return cb({
                        message: 'Internal Server Error',
                        status: 500,
                        success: false,
                    });
                }
                else if (!chapterData) {
                    return cb({
                        message: 'That chapter doesn\'t exist',
                        status: 404,
                        success: false,
                    });
                }

                Quiz.model.findOne({
                    course: courseData._id,
                    chapter: chapterData._id,
                    isAssignment
                }, {}, (err, quizData) => {
                    if (err) {
                        return cb({
                            message: 'Internal Server Error',
                            status: 500,
                            success: false,
                        });
                    }
                    if (!quizData) {
                        return cb({
                            message: `There isn\'t any ${isAssignment ? 'assignment' : 'quiz'} for that chapter`,
                            status: 404,
                            success: false,
                        });
                    }

                    Question.model.find({
                        quiz: quizData._id,
                    }, {
                        _id: 0,
                        __v: 0,
                        course: 0,
                        chapter: 0,
                        quiz: 0,
                    }, (err, questionData) => {
                        if (err) {
                            return cb({
                                message: 'Internal Server Error',
                                status: 500,
                                success: false,
                            });
                        }
                        else if (!questionData) {
                            return cb({
                                message: `There is no questions available for that ${isAssignment? 'assignment' : 'quiz'}.`,
                                status: 404,
                                success: false,
                            });
                        }

                        return cb(null, {
                            success: true,
                            status: 200,
                            data: questionData,
                        });
                    });
                });
            });
        });
    });
};
