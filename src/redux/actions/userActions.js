import fetch from 'isomorphic-fetch';
import { isBrowser } from '../utils/helpers';
import RootPath from '../../../fetchPath';

/**
 * Register actions
 */
export const REQUEST_REGISTER_USER = 'REQUEST_REGISTER_USER';
export const RECIEVE_REGISTER_USER = 'RECIEVE_REGISTER_USER';
export const ERROR_REGISTER_USER = 'ERROR_REGISTER_USER';

function requestRegister() {
  return {
    type: REQUEST_REGISTER_USER
  };
}

function recieveRegister(json) {
  if (json.error) {
    return errorRegister(json.error);
  }

  if (typeof json.token === 'undefined') {
    return errorRegister('Connection error.');
  }

  if (isBrowser) {
    localStorage.setItem('token', json.token);
  }

  return {
    type: RECIEVE_REGISTER_USER,
    token: json.token
  };
}

function errorRegister(error) {
  return {
    type: ERROR_REGISTER_USER,
    error
  };
}

function shouldFetchRegister(state) {
  const user = state.user;

  if (user.loading) {
    return false;
  } else  if (!user.loaded || !user.login) {
    return true;
  }
}

function fetchRegisterDo(name, username, email, password) {
  return dispatch => {
    dispatch(requestRegister());
    return fetch(`${RootPath}/API/user`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password
      })
    })
      .then(response => response.json())
      .then(json => dispatch(recieveRegister(json)));
  };
}

export function fetchRegister(name, username, email, password) {
  return (dispatch, getState) => {
    console.log(getState());
    if (shouldFetchRegister(getState())) {
      dispatch(requestRegister());
      return dispatch(fetchRegisterDo(name, username, email, password));
    }
  };
}

/**
 * Login actions
 */
export const REQUEST_LOGIN_USER = 'REQUEST_LOGIN_USER';
export const RECIEVE_LOGIN_USER = 'RECIEVE_LOGIN_USER';
export const ERROR_LOGIN_USER = 'ERROR_LOGIN_USER';

function requestLogin() {
  return {
    type: REQUEST_LOGIN_USER
  };
}

function recieveLogin(json) {
  if (json.error) {
    return errorLogin(json.error);
  }

  if (typeof json.token === 'undefined') {
    return errorRegister('Connection error.');
  }

  if (isBrowser) {
    localStorage.setItem('token', json.token);
  }

  return {
    type: RECIEVE_LOGIN_USER,
    token: json.token
  };
}

function errorLogin(error) {
  return {
    type: ERROR_LOGIN_USER,
    error
  };
}

function shouldFetchLogin(state) {
  const user = state.user;

  if (user.loading) {
    return false;
  } else  if (!user.loaded || !user.login) {
    return true;
  }
}

function fetchLoginDo(username, password) {
  return dispatch => {
    dispatch(requestLogin());
    return fetch(`${RootPath}/API/login`, {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => dispatch(recieveLogin(json)));
  };
}

export function fetchLogin(username, password) {
  return (dispatch, getState) => {
    if (shouldFetchLogin(getState())) {
      dispatch(requestLogin());
      return dispatch(fetchLoginDo(username, password));
    }
  };
}

/**
 * Refresh token actions
 */
export const REQUEST_REFRESH_TOKEN = 'REQUEST_REFRESH_TOKEN';
export const RECIEVE_REFRESH_TOKEN = 'RECIEVE_REFRESH_TOKEN';
export const ERROR_REFRESH_TOKEN = 'ERROR_REFRESH_TOKEN';
// TODO:  implement refresh request

export function refreshToken() {
  return (dispatch) => {
    return dispatch({
      type: RECIEVE_REFRESH_TOKEN,
      token: localStorage.getItem('token') || ''
    });
  };
}

/**
 * Logout actions
 */
export const DO_LOGOUT = 'DO_LOGOUT';

export function doLogout() {
  return (dispatch) => {
    if (isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('username');
    }

    return dispatch({
      type: DO_LOGOUT
    });
  };
}

/**
 * Simple actions
 */
export const HIDE_ERROR = 'HIDE_ERROR';

export function hideError() {
  return (dispatch) => {
    return dispatch({
      type: HIDE_ERROR
    });
  };
}
