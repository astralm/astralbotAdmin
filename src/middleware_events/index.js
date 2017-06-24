import * as types from '../constants/ActionTypes.js';
import login from './events/login.js';
import forgot_password from './events/forgot_password.js';

const initEventListeners = (socket, store) => {
	socket.on(types.LOGIN, data => {
		login(store, data);
	});
	socket.on(types.FORGOT_PASSWORD, data => {
		forgot_password(store, data);
	});
}

module.exports = initEventListeners;