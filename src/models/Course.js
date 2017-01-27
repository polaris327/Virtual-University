var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Course Model
 * ==========
 */

var Course = new keystone.List('Course');

Course.add({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    courseImage: {
        type: Types.CloudinaryImage,
    },
    homeText: {
        type: Types.Html,
        wysiwyg: true,
        height: 150
    },
    published: {
        type: Types.Boolean,
    },
});

Course.register();
