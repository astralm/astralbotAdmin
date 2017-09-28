import * as Types from '../constants/ActionTypes.js';
import setStatus from './events/SET_STATUS.js';
import setUsers from './events/SET_USERS.js';
import updateUser from './events/UPDATE_USER.js';
import setSessions from './events/SET_SESSIONS.js';
import setSessionInfo from './events/SET_SESSION_INFO.js';
import setSessionDialog from './events/SET_SESSION_DIALOG.js';
import setBotStatus from './events/SET_BOT_STATUS.js';
import sendEmail from './events/SEND_EMAIL.js';
import setDispatches from './events/SET_DISPATCHES.js';
const initEventListeners = (socket, store) => {
	socket.on(Types.LOGIN, setStatus(store));
	socket.on(Types.LOGOUT, setStatus(store));
	socket.on(Types.GET_USERS, setUsers(store));
	socket.on(Types.UPDATE_USER, updateUser(store));
	socket.on(Types.GET_SESSIONS, setSessions(store));
	socket.on(Types.GET_SESSION_INFO, setSessionInfo(store));
	socket.on(Types.GET_SESSION_DIALOG, setSessionDialog(store));
	socket.on(Types.GET_BOT_STATUS, setBotStatus(store));
	socket.on(Types.SEND_EMAIL, sendEmail(store));
	socket.on(Types.GET_DISPATCHES, setDispatches(store));
}
module.exports = initEventListeners;