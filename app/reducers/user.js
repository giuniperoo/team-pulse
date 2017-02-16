// @flow
import Immutable from 'seamless-immutable';
import { userActionTypes } from '../actions/user';

const initialState = Immutable({
  profile: {},
  authenticated: false
});

const userReducer = (
  state: {
    /* eslint-disable flowtype/no-weak-types */
    set: Function,
    merge: Function,
    /* eslint-enable flowtype/no-weak-types */
    profile: {},
    authenticated: boolean
  } = initialState,
  action: {
    type: string,
    userProfile?: {},
    error?: {}
  }
) => {
  switch (action.type) {
    case userActionTypes.LOGIN_START:
      return state;

    case userActionTypes.LOGIN_SUCCESS:
      return state.merge({
        authenticated: true,
        // subset of firebase' response
        profile: {
          /* eslint-disable */
          name: action.user.displayName,
          email: action.user.email,
          photoUrl: action.user.photoURL,
          emailVerified: action.user.emailVerified,
          uid: action.user.uid
          /* eslint-enable */
        }
      });

    case userActionTypes.LOGIN_ERROR:
      console.error('loginError', action.error);

      // Handle Errors here.
      // var errorCode = action.error.code;
      // var errorMessage = action.error.message;
      // if (errorCode === 'auth/wrong-password') {
      //   alert('Wrong password.');
      // } else {
      //   alert(errorMessage);
      // }

      return state;

    default:
      return state;
  }
};

export { userReducer as default };
