// @flow
import Immutable from 'seamless-immutable';
import { authActionTypes } from '../actions/auth';
import { userActionTypes } from '../actions/user';

const initialState = Immutable({
  uid: '',
  team: '',
  email: '',
  location: '',
  photoURL: null,
  startDate: null,
  anonymous: false,
  displayName: null,
  emailVerified: null
});

const userReducer = (
  state: {
    // eslint-disable-next-line flowtype/no-weak-types
    set: Function,
    anonymous?: boolean
  } = initialState,
  action: {
    type: string,
    user?: {
      uid: string,
      team?: string,
      email: string,
      location?: string,
      photoURL?: string,
      startDate?: number,
      anonymous?: boolean,
      displayName?: string,
      emailVerified: boolean
    },
    error?: { code: string }
  }
) => {
  let errorCode;

  switch (action.type) {
    case authActionTypes.LOGIN_START:
      return state;

    case authActionTypes.STORE_USER_DATA:
      if (!action.user) return state;

      return Immutable.replace(state, action.user);

    case authActionTypes.LOGIN_ERROR:
      errorCode = action.error && action.error.code;

      if (errorCode === 'auth/wrong-password') {
        // TODO: display wrong password alert
      }

      console.error('LOGIN_ERROR', action.error);
      return state;

    case authActionTypes.LOGOUT_START:
      return state;

    case authActionTypes.LOGOUT_SUCCESS:
      return Immutable.replace(state, {});

    case authActionTypes.LOGOUT_ERROR:
      console.error('LOGOUT_ERROR', action.error);
      return state;

    case userActionTypes.TOGGLE_DEFAULT_ANONYMOUS_SUCCESS:
      return state.set('anonymous', !state.anonymous);

    case userActionTypes.TOGGLE_DEFAULT_ANONYMOUS_ERROR:
      console.error('TOGGLE_DEFAULT_ANONYMOUS_ERROR', action.error);
      return state;

    default:
      return state;
  }
};

export { userReducer as default };
