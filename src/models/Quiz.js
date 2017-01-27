var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Quiz Model
 * ==========
 */

var Quiz = new keystone.List('Quiz', {
    label: 'Quizzes',
    singular: 'Quiz',
    plural: 'Quizzes',
    map: {
        name: 'title',
        course: 'course',
        chapter: 'chapter',
        assignment: 'assignment',
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true,
    },
});

Quiz.add({
    title: {
        type: String,
        required: true,
    },
    course: {
        type: Types.Relationship,
        ref: 'Course'
    },
    chapter: {
        type: Types.Relationship,
        ref: 'Chapter',
        filters: {
            course: ':course',
        },
    },
    isAssignment: {
        type: Types.Boolean,
        default: false,
        label: 'Is this quiz an assignment?',
    },
});

Quiz.defaultColumns = 'title, course, chapter, isAssignment';

Quiz.register();
