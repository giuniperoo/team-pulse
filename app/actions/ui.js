// @flow
export const uiActionTypes = {
  CHANGE_TAB: 'CHANGE_TAB',
  TOGGLE_ALERT: 'TOGGLE_ALERT',
  TOGGLE_OFFLINE: 'TOGGLE_OFFLINE',
  TOGGLE_BUTTON_SPINNER: 'TOGGLE_BUTTON_SPINNER'
};

export const changeTab = (tab: string) => ({
  type: uiActionTypes.CHANGE_TAB,
  tab
});

export const toggleButtonSpinner = () => ({
  type: uiActionTypes.TOGGLE_BUTTON_SPINNER
});

export const toggleOffline = (toggle: boolean) => ({
  type: uiActionTypes.TOGGLE_OFFLINE,
  toggle
});

export const toggleAlert = (toggle: boolean, text?: string) => ({
  type: uiActionTypes.TOGGLE_ALERT,
  toggle,
  text
});
