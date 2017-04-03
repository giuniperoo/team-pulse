// @flow
import Immutable from 'seamless-immutable';
import { uiActionTypes } from '../actions/ui';

const initialState = Immutable({
  displayedTab: '',
  offline: false,
  alertText: '',
  alertActive: false,
  buttonSpinnerActive: false
});

const uiReducer = (
  state: {
    /* eslint-disable flowtype/no-weak-types */
    set: Function,
    merge: Function,
    /* eslint-enable flowtype/no-weak-types */
    displayedTab: string,
    buttonSpinnerActive: boolean
  } = initialState,
  action: { type: string, tab?: string, toggle?: boolean, text?: string }
) => {
  switch (action.type) {
    case uiActionTypes.CHANGE_TAB:
      return state.set('displayedTab', action.tab);

    case uiActionTypes.TOGGLE_BUTTON_SPINNER:
      return state.set('buttonSpinnerActive', !state.buttonSpinnerActive);

    case uiActionTypes.TOGGLE_OFFLINE:
      return state.set('offline', action.toggle);

    case uiActionTypes.TOGGLE_ALERT:
      return state.merge({
        alertText: action.text ? action.text : '',
        alertActive: action.toggle
      });

    default:
      return state;
  }
};

export { uiReducer as default };
