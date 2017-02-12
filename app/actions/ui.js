// @flow
export const uiActionTypes = {
  CHANGE_TAB: 'CHANGE_TAB',
  TOGGLE_BUTTON_SPINNER: 'TOGGLE_BUTTON_SPINNER'
};

export const changeTab = (tab: string) => ({
  type: uiActionTypes.CHANGE_TAB,
  tab
});

export const toggleButtonSpinner = () => ({
  type: uiActionTypes.TOGGLE_BUTTON_SPINNER
});
