import * as Types from '../constants/ActionTypes.js';
import setStatus from './events/SET_STATUS.js';
import setUsers from './events/SET_USERS.js';
const initEventListeners = (socket, store) => {
	socket.on(Types.LOGIN, setStatus(store));
	socket.on(Types.LOGOUT, setStatus(store));
	socket.on(Types.GET_USERS, setUsers(store));
}
module.exports = initEventListeners;