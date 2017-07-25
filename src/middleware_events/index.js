import * as Types from '../constants/ActionTypes.js';
import setStatus from './events/SET_STATUS.js';
import setUsers from './events/SET_USERS.js';
import updateUser from './events/UPDATE_USER.js';
import setSessions from './events/SET_SESSIONS.js';
import setUserSessions from './events/SET_USER_SESSIONS.js';
import setFreeSessions from './events/SET_FREE_SESSIONS.js';
import setBusySessions from './events/SET_BUSY_SESSIONS.js';
import setErrorSessions from './events/SET_ERROR_SESSIONS.js';
import setSuccessSessions from './events/SET_SUCCESS_SESSIONS.js';
import setActiveSessions from './events/SET_ACTIVE_SESSIONS.js';
import setInactiveSessions from './events/SET_INACTIVE_SESSIONS.js';
import setOffset from './events/SET_OFFSET.js';
const initEventListeners = (socket, store) => {
	socket.on(Types.LOGIN, setStatus(store));
	socket.on(Types.LOGOUT, setStatus(store));
	socket.on(Types.GET_USERS, setUsers(store));
	socket.on(Types.UPDATE_USER, updateUser(store));
	socket.on(Types.GET_SESSIONS, setSessions(store));
	socket.on(Types.GET_USER_SESSIONS, setUserSessions(store));
	socket.on(Types.GET_FREE_SESSIONS, setFreeSessions(store));
	socket.on(Types.GET_BUSY_SESSIONS, setBusySessions(store));
	socket.on(Types.GET_ERROR_SESSIONS, setErrorSessions(store));
	socket.on(Types.GET_SUCCESS_SESSIONS, setSuccessSessions(store));
	socket.on(Types.GET_ACTIVE_SESSIONS, setActiveSessions(store));
	socket.on(Types.GET_INACTIVE_SESSIONS, setInactiveSessions(store));
	socket.on(Types.SET_OFFSET, setOffset(store));
}
module.exports = initEventListeners;