// @flow
import { uiActionTypes } from '../actions/ui';

const initialState = {
  displayedTab: 'feedback'
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const reducer = (
  state: { displayedTab: string } = initialState,
  action: { type: string, tab: string | void }
) => {
  switch (action.type) {
    case uiActionTypes.CHANGE_TAB:
      state.displayedTab = action.tab || 'feedback';
      return state;
    default:
      return state;
  }
};

export { reducer as default };
