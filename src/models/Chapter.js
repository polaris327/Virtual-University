var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Chapter Model
 * ==========
 */

var Chapter = new keystone.List('Chapter');

Chapter.add({
    name: {
        type: String,
        required: true
    },
    published: {
        type: Types.Boolean,
    },
    course: {
        type: Types.Relationship,
        ref: 'Course',
    }
});

Chapter.defaultColumns = 'name, course';

Chapter.register();
