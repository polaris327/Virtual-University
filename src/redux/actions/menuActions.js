import fetch from 'isomorphic-fetch';

/**
 * Register actions
 */
export const REQUEST_MENU_ITEMS = 'REQUEST_MENU_ITEMS';
export const RECIEVE_MENU_ITEMS = 'RECIEVE_MENU_ITEMS';
export const ERROR_MENU_ITEMS = 'ERROR_MENU_ITEMS';

function requestMenu() {
  return {
    type: REQUEST_MENU_ITEMS
  };
}

function recieveMenu(json, course) {
  console.log(json);
  
  if (json.error) {
    return errorMenu(json.error);
  }
  
  if(json.data.chapters) {
    json.data.chapters.map(item => {
      fetchMenuQuizDo(course, item);
      fetchMenuVideosDo(course, item);
      fetchMenuPdfDo(course, item);
    });
  }
  
  return {
    type: RECIEVE_MENU_ITEMS,
    chapters: json.data.chapters,
    currentCourse: course
  };
}

function recieveMenuQuiz(json) {
  console.log('Quiz:', json);

  if (json.error) {
    return errorMenu(json.error);
  }
}

function recieveMenuPdf(json) {
  console.log('Pdf:', json);

  if (json.error) {
    return errorMenu(json.error);
  }
}

function recieveMenuVideos(json) {
  console.log('Videos:', json);

  if (json.error) {
    return errorMenu(json.error);
  }
}

function errorMenu(error) {
  return {
    type: ERROR_MENU_ITEMS,
    error
  };
}

function shouldFetchMenu(state) {
  const menu = state.menu;

  if (menu.loading) {
    return false;
  } else  if (!menu.loaded) {
    return true;
  }
}

function fetchMenuDo(course) {
  return dispatch => {
    dispatch(requestMenu());
    return fetch(`/API/nav/get?courseName=${course}`, {
      headers: { 'jwt': localStorage.getItem('token') }
    })
      .then(response => response.json())
      .then(json => dispatch(recieveMenu(json, course)));
  };
}

function fetchMenuQuizDo(course, chapter) {
  console.log('fetchMenuQuizDo', course, chapter);
  return dispatch => {
    return fetch(`/API/course/quiz?courseName=${course}&chapterName=${chapter}`, {
      headers: { 'jwt': localStorage.getItem('token') }
    })
      .then(response => response.json())
      .then(json => dispatch(recieveMenuQuiz(json)));
  };
}

function fetchMenuVideosDo(course, chapter) {
  console.log('fetchMenuVideosDo', course, chapter);
  return dispatch => {
    return fetch(`/API/course/chapter/media/get?courseName=${course}&chapterName=${chapter}&fileType=Video`, {
      headers: { 'jwt': localStorage.getItem('token') }
    })
      .then(response => response.json())
      .then(json => dispatch(recieveMenuVideos(json)));
  };
}

function fetchMenuPdfDo(course, chapter) {
  console.log('fetchMenuPdfDo', course, chapter);
  return dispatch => {
    return fetch(`/API/course/chapter/media/get?courseName=${course}&chapterName=${chapter}&fileType=PDF`, {
      headers: { 'jwt': localStorage.getItem('token') }
    })
      .then(response => response.json())
      .then(json => dispatch(recieveMenuPdf(json)));
  };
}

export function fetchMenu(course) {
  return (dispatch, getState) => {
    console.log(getState());
    if (shouldFetchMenu(getState())) {
      dispatch(requestMenu());
      return dispatch(fetchMenuDo(course));
    }
  };
}
