// @flow
import Immutable from 'seamless-immutable';
import { uiActionTypes } from '../actions/ui';

const initialState = Immutable({
  displayedTab: ''
});

const uiReducer = (
  // eslint-disable-next-line flowtype/no-weak-types
  state: { set: Function, displayedTab: string } = initialState,
  action: { type: string, tab: string | void }
) => {
  switch (action.type) {
    case uiActionTypes.CHANGE_TAB:
      return state.set('displayedTab', action.tab);
    default:
      return state;
  }
};

export { uiReducer as default };
