// @flow
export const uiActionTypes = {
  CHANGE_TAB: 'CHANGE_TAB'
};

export const changeTab = (tab: string) => ({
  type: uiActionTypes.CHANGE_TAB,
  tab
});
