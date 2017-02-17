// @flow
export const uiActionTypes = {
  CHANGE_TAB: 'CHANGE_TAB',
  EDIT_USER_PROFILE: 'EDIT_USER_PROFILE',
  TOGGLE_BUTTON_SPINNER: 'TOGGLE_BUTTON_SPINNER'
};

export const changeTab = (tab: string) => ({
  type: uiActionTypes.CHANGE_TAB,
  tab
});

export const editUserProfile = () => ({
  type: uiActionTypes.EDIT_USER_PROFILE
});

export const toggleButtonSpinner = () => ({
  type: uiActionTypes.TOGGLE_BUTTON_SPINNER
});
