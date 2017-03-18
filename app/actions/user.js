// @flow
import * as firebase from 'firebase';

export const userActionTypes = {
  TOGGLE_DEFAULT_ANONYMOUS_SUCCESS: 'TOGGLE_DEFAULT_ANONYMOUS_SUCCESS',
  TOGGLE_DEFAULT_ANONYMOUS_ERROR: 'TOGGLE_DEFAULT_ANONYMOUS_ERROR'
};

export const toggleDefaultAnonymousSuccess = () => ({
  type: userActionTypes.TOGGLE_DEFAULT_ANONYMOUS_SUCCESS
});

export const toggleDefaultAnonymousError = () => ({
  type: userActionTypes.TOGGLE_DEFAULT_ANONYMOUS_ERROR
});

// eslint-disable-next-line flowtype/no-weak-types
export const toggleDefaultAnonymous = (uid: string, toggle: boolean) => (dispatch: Function) => {
  const usersRef = firebase.database().ref(`users/${uid}`);

  usersRef.update({ anonymous: toggle })
    .then(() => dispatch(toggleDefaultAnonymousSuccess()))
    .catch(error => dispatch(toggleDefaultAnonymousError(error)));
};
