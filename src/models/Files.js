var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * File Model
 * ==========
 */

var File = new keystone.List('File');

File.add({
    name: {
        type: String,
        required: true
    },
    course: {
        type: Types.Relationship,
        ref: 'Course',
    },
    chapter: {
        type: Types.Relationship,
        ref: 'Chapter',
        filters: {
            course: ':course',
        },
    },
    description: {
        type: String
    },
    type: {
        type: Types.Select,
        options: 'Video, PDF'
    },
    file: {
        type: Types.S3File,
    },
});

File.defaultColumns = 'name, course, chapter, type';

File.register();
