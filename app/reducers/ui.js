// @flow
import Immutable from 'seamless-immutable';
import { uiActionTypes } from '../actions/ui';

const initialState = Immutable({
  displayedTab: '',
  offline: false,
  buttonSpinnerActive: false,
  userProfileInEditMode: false
});

const uiReducer = (
  // eslint-disable-next-line flowtype/no-weak-types
  state: { set: Function, displayedTab: string, buttonSpinnerActive: boolean } = initialState,
  action: { type: string, tab?: string, toggle?: boolean }
) => {
  switch (action.type) {
    case uiActionTypes.CHANGE_TAB:
      return state.set('displayedTab', action.tab);
    case uiActionTypes.EDIT_USER_PROFILE:
      return state.set('userProfileInEditMode', true);
    case uiActionTypes.TOGGLE_BUTTON_SPINNER:
      return state.set('buttonSpinnerActive', !state.buttonSpinnerActive);
    case uiActionTypes.TOGGLE_OFFLINE:
      return state.set('offline', action.toggle);
    default:
      return state;
  }
};

export { uiReducer as default };
