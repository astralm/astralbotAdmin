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
export const setUser = (email, password, name, organization_id) => ({ type: types.SET_USER, email, password, name, organization_id });
export const updateUser = (email, password, name, status, id, organization_id) => ({ type: types.UPDATE_USER, email, password, name, status, id, organization_id });
export const bindSession = (user_id, session_id) => ({ type: types.BIND_SESSION, user_id, session_id });
export const unbindSession = (user_id, session_id) => ({ type: types.UNBIND_SESSION, user_id, session_id });
export const setViewSession = session_id => ({ type: types.SET_VIEW_SESSION, session_id });
export const getSessionInfo = session_id => ({ type: types.GET_SESSION_INFO, session_id });
export const setSessionInfo = session => ({ type: types.SET_SESSION_INFO, session });
export const getSessionDialog = session_id => ({ type: types.GET_SESSION_DIALOG, session_id });
export const setSessionDialog = dialog => ({ type: types.SET_SESSION_DIALOG, dialog });
export const setAnswer = (hash, session_id, message) => ({ type: types.SET_ANSWER, hash, session_id, message });
export const stopBot = session_id => ({ type: types.STOP_BOT, session_id });
export const startBot = session_id => ({ type: types.START_BOT, session_id });
export const updateUserInformation = (email, password, name) => ({ type: types.UPDATE_USER_INFORMATION, email, password, name });
export const setFilter = (filter, offset, order, firstDate, secondDate) => ({ type: types.SET_FILTER, filter, offset, order, firstDate, secondDate });
export const setOffset = offset => ({type: types.SET_OFFSET, offset});
export const setOrder = (name, desc) => ({type: types.SET_ORDER, name, desc});
export const getSessions = (filters, order, offset, firstDate, secondDate) => ({type: types.GET_SESSIONS, filters, order, offset, firstDate, secondDate});
export const setSessions = sessions => ({type: types.SET_SESSIONS, sessions});
export const initNotification = () => ({type: types.INIT_NOTIFICATION});
export const setBotStatus = status => ({type: types.SET_BOT_STATUS, status});
export const getBotStatus = id => ({type: types.GET_BOT_STATUS, id});
export const removeErrorSession = (id, hash) => ({type: types.REMOVE_ERROR_SESSION, session_id: id, session_hash: hash});
export const validate = validate => ({type: types.VALIDATE, validate});
export const sendEmail = email => ({type: types.SEND_EMAIL, email});
export const mailSended = status => ({type: types.MAIL_SENDED, status});
export const deleteDispatch = dispatch_id => ({type: types.DELETE_DISPATCH, dispatch_id});
export const newDispatch = (dispatch_message, dispatch_telegram, dispatch_widget, dispatch_partner, dispatch_faq, dispatch_sale) => ({type: types.NEW_DISPATCH, dispatch_message, dispatch_telegram, dispatch_widget, dispatch_partner, dispatch_faq, dispatch_sale});
export const getDispatches = () => ({type: types.GET_DISPATCHES});
export const setDispatches = dispatches => ({type: types.SET_DISPATCHES, dispatches});
export const setFirstDate = date => ({type: types.SET_FIRST_DATE, date});
export const setSecondDate = date => ({type: types.SET_SECOND_DATE, date});
export const getClients = () => ({type: types.GET_CLIENTS});
export const setClients = clients => ({type: types.SET_CLIENTS, clients});
export const setViewClient = client_id => ({type: types.SET_VIEW_CLIENT, client_id});
export const getClient = client_id => ({type: types.GET_CLIENT, client_id});
export const setClient = client => ({type: types.SET_CLIENT, client});
export const updateClientInformation = result => ({ type: types.UPDATE_CLIENT_INFORMATION, result });
export const getOrganizations = () => ({type: types.GET_ORGANIZATIONS});
export const setOrganizations = organizations => ({type: types.SET_ORGANIZATIONS, organizations});
export const getOrganization = organization_id => ({type: types.GET_ORGANIZATION, organization_id});
export const setOrganization = organization => ({type: types.SET_ORGANIZATION, organization});
export const setViewOrganization = organization_id => ({type: types.SET_VIEW_ORGANIZATION, organization_id});
export const updateOrganizationInformation = result => ({type: types.UPDATE_ORGANIZATION_INFORMATION, result});
export const createOrganization = (organization_name, organization_site, organization_root) => ({type: types.CREATE_ORGANIZATION, organization_name, organization_site, organization_root});
export const getUserOrganization = user_id => ({type: types.GET_USER_ORGANIZATION, user_id});
export const setUserOrganization = userOrganization => ({type: types.SET_USER_ORGANIZATION, userOrganization});