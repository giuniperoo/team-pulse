// @flow
export const uiActionTypes = {
  CHANGE_TAB: 'CHANGE_TAB'
};

// export const uiActions = {
//   changeTab: (tab: string) => ({
//     type: uiActionTypes.CHANGE_TAB,
//     tab
//   })
// };

// export function changeTab(tab: string) {
//   return ()
//   type: uiActionTypes.CHANGE_TAB,
//   tab
// };

export const changeTab = (tab: string) => ({
  type: uiActionTypes.CHANGE_TAB,
  tab
});
