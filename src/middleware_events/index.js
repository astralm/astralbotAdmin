import * as types from '../constants/ActionTypes.js';
import login from './events/login.js';
import forgot_password from './events/forgot_password.js';
import getHash from './events/getHash.js';
import setHash from './events/setHash.js';
import setStatus from './events/setStatus.js';
const initEventListeners = (socket, store) => {
	socket.on(types.LOGIN, data => {
		login(store, data);
	});
	socket.on(types.FORGOT_PASSWORD, data => {
		forgot_password(store, data);
	});
	socket.on(types.CONNECT, data => {
		getHash(store, data);
	});
	socket.on(types.SET_HASH, data => {
		setHash(store, data);
	});
	socket.on(types.DISCONNECT, data => {
		setStatus(store, "offline");
	});
}

module.exports = initEventListeners;