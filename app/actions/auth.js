// @flow
import * as firebase from 'firebase';
import { toggleButtonSpinner } from '../actions/ui';

export const authActionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT_START: 'LOGOUT_START',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR'
};

export const loginStart = () => ({
  type: authActionTypes.LOGIN_START
});

export const storeUserData = (user: {}) => ({
  type: authActionTypes.LOGIN_SUCCESS,
  user
});

export const loginError = (error: {}) => ({
  type: authActionTypes.LOGIN_ERROR,
  error
});

// eslint-disable-next-line flowtype/no-weak-types
export const login = (email: string, password: string) => (dispatch: Function) => {
  dispatch(loginStart());
  dispatch(toggleButtonSpinner());

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      dispatch(storeUserData(response));
      return dispatch(toggleButtonSpinner());
    })
    .catch(error => {
      dispatch(loginError(error));
      return dispatch(toggleButtonSpinner());
    });
};

export const logoutStart = () => ({
  type: authActionTypes.LOGOUT_START
});

export const logoutSuccess = () => ({
  type: authActionTypes.LOGOUT_SUCCESS
});

export const logoutError = (error: {}) => ({
  type: authActionTypes.LOGOUT_ERROR,
  error
});


// eslint-disable-next-line flowtype/no-weak-types
export const logout = () => (dispatch: Function) => {
  dispatch(logoutStart());

  firebase.auth().signOut()
    .then(response => dispatch(logoutSuccess(response)))
    .catch(error => dispatch(logoutError(error)));
};
