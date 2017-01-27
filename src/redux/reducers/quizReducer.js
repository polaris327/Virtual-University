import {
  REQUEST_COURSE_QUIZ,
  RECEIVE_COURSE_QUIZ,
  ERROR_COURSE_QUIZ
}                                           from '../actions/quizActions';

const initialState = {
  quizzes: [],
  assignments: [],
  loading: false,
  loaded: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_COURSE_QUIZ:
      return {
        ...state,
        loading: true
      };

    case RECEIVE_COURSE_QUIZ:
      if (action.payload.isAssignment) {
        return {
          ...state,
          loading: false,
          loaded: true,
          assignments: action.payload
        };
      }

      return {
        ...state,
        loading: false,
        loaded: true,
        quizzes: action.payload
      };

    case ERROR_COURSE_QUIZ:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };

    default:
      return state;
  }
}
