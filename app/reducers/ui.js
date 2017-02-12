// @flow
import Immutable from 'seamless-immutable';
import { uiActionTypes } from '../actions/ui';

const initialState = Immutable({
  displayedTab: '',
  buttonSpinnerActive: false
});

const uiReducer = (
  // eslint-disable-next-line flowtype/no-weak-types
  state: { set: Function, displayedTab: string, buttonSpinnerActive: boolean } = initialState,
  action: { type: string, tab: string | void }
) => {
  switch (action.type) {
    case uiActionTypes.CHANGE_TAB:
      return state.set('displayedTab', action.tab);
    case uiActionTypes.TOGGLE_BUTTON_SPINNER:
      return state.set('buttonSpinnerActive', !state.buttonSpinnerActive);
    default:
      return state;
  }
};

export { uiReducer as default };
