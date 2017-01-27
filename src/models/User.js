var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User', {
  unique: true,
});

User.add({
  name: {
    type: Types.Name,
    required: true,
    index: true
  },
  username: {
    type: Types.Text,
    required: true,
    initial: false,
    unique: true,
    dropDups: true,
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: Types.Password,
    initial: true,
    required: true
  },
  birthday: {
    type: Types.Date
  },
  courses: {
    type: Types.Relationship,
    many: true,
    ref: 'Course',
  },
});

User.defaultColumns = 'name, username, email';
User.register();
