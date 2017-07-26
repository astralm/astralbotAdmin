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

//--------------------

export const updateState = state => ({ type: types.UPDATE_STATE, state });
export const login = (email, password) => ({ type: types.LOGIN, email, password });
export const setStatus = status => ({ type: types.SET_STATUS, status });
export const logout = () => ({ type: types.LOGOUT });
export const getUsers = () => ({ type: types.GET_USERS });
export const setUsers = users => ({ type: types.SET_USERS, users });
export const setUser = (email, password, name) => ({ type: types.SET_USER, email, password, name });
export const updateUser = (email, password, name, status, id) => ({ type: types.UPDATE_USER, email, password, name, status, id });
export const getSessions = offset => ({ type: types.GET_SESSIONS, offset });
export const setSessions = sessions => ({ type: types.SET_SESSIONS, sessions });
export const getActiveSessions = offset => ({ type: types.GET_ACTIVE_SESSIONS, offset });
export const setActiveSessions = sessions => ({ type: types.SET_ACTIVE_SESSIONS, sessions });
export const getInactiveSessions = offset => ({ type: types.GET_INACTIVE_SESSIONS, offset });
export const setInactiveSessions = sessions => ({ type: types.SET_INACTIVE_SESSIONS, sessions });
export const getErrorSessions = offset => ({ type: types.GET_ERROR_SESSIONS, offset });
export const setErrorSessions = sessions => ({ type: types.SET_ERROR_SESSIONS, sessions });
export const getSuccessSessions = offset => ({ type: types.GET_SUCCESS_SESSIONS, offset });
export const setSuccessSessions = sessions => ({ type: types.SET_SUCCESS_SESSIONS, sessions });
export const getUserSessions = (offset, userId) => ({ type: types.GET_USER_SESSIONS, offset, userId });
export const setUserSessions = sessions => ({ type: types.SET_USER_SESSIONS, sessions });
export const getFreeSessions = offset => ({ type: types.GET_FREE_SESSIONS, offset });
export const setFreeSessions = sessions => ({ type: types.SET_FREE_SESSIONS, sessions });
export const getBusySessions = offset => ({ type: types.GET_BUSY_SESSIONS, offset });
export const setBusySessions = sessions => ({ type: types.SET_BUSY_SESSIONS, sessions});
export const setOffset = offset => ({ type: types.SET_OFFSET, offset });
export const setSwitch = data => ({ type: types.SET_SWITCH, switch: data });
export const bindSession = (user_id, session_id) => ({ type: types.BIND_SESSION, user_id, session_id });
export const unbindSession = (user_id, session_id) => ({ type: types.UNBIND_SESSION, user_id, session_id });
