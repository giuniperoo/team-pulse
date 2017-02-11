// @flow
import Immutable from 'seamless-immutable';
import { userActionTypes } from '../actions/user';

const initialState = Immutable({
  authenticated: false
});

const userReducer = (
  state: {
    /* eslint-disable flowtype/no-weak-types */
    set: Function,
    /* eslint-enable flowtype/no-weak-types */
    authenticated: boolean
  } = initialState,
  action: {
    type: string,
    user: {} | void,
    error: {} | void
  }
) => {
  switch (action.type) {
    case userActionTypes.LOGIN_START:
      console.log('login start');
      return state;

    case userActionTypes.LOGIN_SUCCESS:
      console.log('login success');
      return state.set('authenticated', true);

    case userActionTypes.LOGIN_ERROR:
      console.log('signInError', action.error);
      return state;

    default:
      return state;
  }
};

export { userReducer as default };
