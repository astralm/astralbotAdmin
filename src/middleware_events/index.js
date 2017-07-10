import * as types from '../constants/ActionTypes.js';
import Hash from './events/HASH.js';
import Login from './events/LOGIN.js';
import SetStatus from './events/SET_STATUS.js';
const initEventListeners = (socket, store) => {
	socket.on(types.HASH, data => {
		Hash(store, data);
	});
	socket.on(types.LOGIN, data => {
		Login(store, data);
	});
	socket.on(types.SET_STATUS, data => {
		SetStatus(store, data);
	});
	socket.on('disconnect', () => {
		SetStatus(store, 2);
	});
}

module.exports = initEventListeners;