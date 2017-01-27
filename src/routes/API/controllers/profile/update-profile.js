const User = require('keystone').list('User').model;

module.exports = (newProfile, userId, cb) => {
  const toUpdate = {};

  if (!(newProfile.email || newProfile.name || newProfile.birthday)) {
    return cb({
      message: 'Missing parameters',
      status: 400,
      success: false
    });
  }

  Object.keys(newProfile).forEach(item => item && item.length ? toUpdate[item] = newProfile[item] : false);

  User.findByIdAndUpdate(userId, toUpdate, (err, profile) => {
    if (err) {
      return cb({
        message: 'Internal error',
        status: 500,
        success: false,
      });
    }

    return cb(null, {
      message: 'Profile successfuly updated',
      status: 200,
      success: true,
    });
  });
};
