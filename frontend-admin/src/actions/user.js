import { callHttpRequest } from '../helpers/services';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin(userData) {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    // dispatch(requestLogout());
    localStorage.removeItem('authenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  return async (dispatch) => {
    //dispatch(receiveLogin());

    const { data = {}, status = false } = await callHttpRequest(
      'post',
      'users/login',
      creds
    );
    //console.log(data, '.hjghjghjg');
    if (status) {
      console.log(data, '...userData');
      localStorage.setItem('token', data.token);
      localStorage.setItem('authenticated', true);
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(receiveLogin(data));
    } else {
      dispatch(loginError('Please enter valid login details.'));
    }
  };
}
