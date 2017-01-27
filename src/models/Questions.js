var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Question Model
 * ==========
 */

var Question = new keystone.List('Question', {
    map: {
        name: 'title',
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true,
    },
});

Question.add({
    title: {
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
    quiz: {
        type: Types.Relationship,
        ref: 'Quiz',
        filters: {
            chapter: ':chapter',
            course: ':course',
        },
    },
    questionTitle: {
        type: Types.Html,
        wysiwyg: true,
    },
    questionType: {
        type: Types.Select,
        options: 'multiple select, multiple choice, short answer, coding, mixed and match',
        emptyOption: true,
    },

    // QUESTION TYPES

    //// Multiple select

    questionOptionsSelect: {
        type: Types.TextArray,
        dependsOn: {
            questionType: 'multiple select',
        }
    },
    correctAnswerSelect: {
        type: String,
        dependsOn: {
            questionType: 'multiple select',
        }
    },

    //// Multiple choice

    questionOptionsChoice: {
        type: Types.TextArray,
        dependsOn: {
            questionType: 'multiple choice'
        }
    },
    correctAnswerChoice: {
        type: Types.TextArray,
        dependsOn: {
            questionType: 'multiple choice'
        }
    },

    //// Short answer

    questionAnswer: {
        type: String,
        dependsOn: {
            questionType: 'short answer',
        },
    },

    //// Mixed and match

    questionColumn: {
        type: Types.TextArray,
        dependsOn: {
            questionType: 'mixed and match',
        }
    },
    correctAnswers: {
        type: Types.TextArray,
        dependsOn: {
            questionType: 'mixed and match',
        },
    },

    //// Coding

    expectedResult: {
        type: String,
        dependsOn: {
            questionType: 'coding',
        },
    },

});

Question.defaultColumns = 'title, course, chapter, quiz, questionType';

Question.register();
