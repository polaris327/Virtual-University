const User = require('keystone').list('User').model;
const ObjectId = require('mongoose').mongo.ObjectId;

module.exports = (userId, cb) => {
  User.findById({
    _id: userId,
  }, {
    __v: 0,
    _id: 0,
    quizTaken: 0,
    password: 0,
  }, (err, profile) => {
    if (err) {
      return cb({
        message: 'Internal server error',
        status: 500,
        success: false
      });
    }

    return cb(null, {
      data: profile,
      status: 200,
      success: true,
    });
  });
};
