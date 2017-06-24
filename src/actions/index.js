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
export function login(email, password) {
	return { type: types.LOGIN, email, password };
}
export function logout(){
  return { type: types.LOGOUT };
}
export function forgotPassword(email){
  return { type: types.FORGOT_PASSWORD, email };
}
export function updateUser(user){
	return { type: types.UPDATE_USER, user };
}
export function updateState(state) {
	return { type: types.UPDATE_STATE, state };
}
