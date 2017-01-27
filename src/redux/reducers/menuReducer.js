import {
  REQUEST_MENU_ITEMS,
  RECIEVE_MENU_ITEMS
} from '../actions/menuActions';

const initialState = {
  currentCourse: {
    name: '',
    chapters: [],
    elements: {
      "Assignments": [],
      "Course Materials": [],
      "Tutorials": [],
      "Videos": [],
      "Grades": [],
      "Quizzes": [],
      loading: false,
      loaded: false
    }
  },
  items: [
    {
      label: 'Home',
      url: '/',
      icon: 'home'
    },
    {
      label: 'Assignments',
      url: '/course/:course/:chapter/assignments',
      icon: 'library_books',
      replacer: /:course|:chapter/i
    },
    {
      label: 'Quizzes',
      url: '/course/:course/:chapter/quizzes',
      icon: 'help',
      replacer: /:course|:chapter/i
    },
    {
      label: 'Course Materials',
      url: '/course/:course/:chapter/materials',
      icon: 'picture_as_pdf'
    },
    {
      label: 'Videos',
      url: '/course/:course/:chapter/videos',
      icon: 'video_library'
    },
    {
      label: 'Tutorials',
      url: '/tutorials',
      icon: 'assignment_ind'
    },
    {
      label: 'Grades',
      url: '/grades',
      icon: 'stars'
    }
  ]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_MENU_ITEMS:
      return Object.assign({}, state, {
      });
    case RECIEVE_MENU_ITEMS:
      return Object.assign({}, state, {
        currentCourse: Object.assign(state.currentCourse, {}, {
          chapters: action.chapters,
          name: action.currentCourse
        })
      });
    default:
      return state;
  }
}
