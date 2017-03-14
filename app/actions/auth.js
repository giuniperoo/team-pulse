// @flow
import * as firebase from 'firebase';
import { pick } from 'lodash';
import { toggleButtonSpinner } from '../actions/ui';

export const authActionTypes = {
  LOGIN_START: 'LOGIN_START',
  STORE_USER_DATA: 'STORE_USER_DATA',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT_START: 'LOGOUT_START',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR'
};

export const loginStart = () => ({
  type: authActionTypes.LOGIN_START
});

export const storeUserData = (user: {}) => ({
  type: authActionTypes.STORE_USER_DATA,
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
    .then(user => {
      // get app-specific user props
      const usersRef = firebase.database().ref('users');

      return usersRef.child(user.uid).once('value')
        .then(snapshot => {
          let userObj = pick(user, [
            'uid',
            'displayName',
            'email',
            'photoURL',
            'emailVerified'
          ]);

          userObj = Object.assign(userObj, snapshot.val());
          dispatch(storeUserData(userObj));
          return dispatch(toggleButtonSpinner());
        })
        .catch(error => console.error('error', error));
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
