import * as types from '../constants/ActionTypes';

export function toggleBoxedLayout(isLayoutBoxed) {
  return { type: types.TOGGLE_BOXED_LAYOUT, isLayoutBoxed };
}
export function togglCollapsedNav(isNavCollapsed) {
  return { type: types.TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}
export function toggleNavBehind(isNavBehind) {
  return { type: types.TOGGLE_NAV_BEHIND, isNavBehind };
}
export function toggleFixedHeader(isFixedHeader) {
  return { type: types.TOGGLE_FIXED_HEADER, isFixedHeader };
}
export function changeSidebarWidth(sidebarWidth) {
  return { type: types.CHANGE_SIDEBAR_WIDTH, sidebarWidth };
}
export function changeColorOption(colorOption) {
  return { type: types.CHANGE_COLOR_OPTION, colorOption };
}
export function changeTheme(themeOption) {
  return { type: types.CHANGE_THEME, theme: themeOption };
}
export function getUsers(getUsers) {
    return { type: types.GET_USERS, theme: getUsers };
}
export function setUsers(setUsers) {
    return { type: types.SET_USERS, theme: setUsers };
}
//--------------------

export const updateState = state => ({ type: types.UPDATE_STATE, state });
export const login = (email, password) => ({
	type: types.LOGIN,
	email: email,
	password: password
});
export const setStatus = status => ({ type: types.SET_STATUS, status });
export const logout = () => ({ type: types.LOGOUT });