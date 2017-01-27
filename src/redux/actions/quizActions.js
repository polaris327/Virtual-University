import fetch from 'isomorphic-fetch';

/*
* Handles quiz actions
* /API/course/quiz?courseName=STRING&chapterName=STRING&isAssignment=BOOLEAN
*/

export const REQUEST_COURSE_QUIZ = 'REQUEST_COURSE_QUIZ';
export const RECEIVE_COURSE_QUIZ = 'RECEIVE_COURSE_QUIZ';
export const ERROR_COURSE_QUIZ = 'ERROR_COURSE_QUIZ';

function requestCourseQuiz() {
  return {
    type: REQUEST_COURSE_QUIZ
  };
}

function receiveCourseQuiz(json) {
  return {
    type: RECEIVE_COURSE_QUIZ,
    payload: json.data
  };
}

function errorCourseQuiz(err) {
  return {
    type: ERROR_COURSE_QUIZ,
    payload: err.message
  };
}

export function fetchCourseQuiz(params) {
  return (dispatch, getState) => {
    dispatch(requestCourseQuiz());

    fetch(`/API/course/quiz?courseName=${params.courseName}&chapterName=${params.chapterName}&isAssignment=${params.isAssignment}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'jwt': localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then((res) => {
        if (params.isAssignment) {
          res.data.isAssignment = true;
        }
        dispatch(receiveCourseQuiz(res));
      });
  };
}
