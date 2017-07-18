import * as Types from '../constants/ActionTypes.js';
import setStatus from './events/SET_STATUS.js';
const initEventListeners = (socket, store) => {
	socket.on(Types.LOGIN, setStatus(store));
}
module.exports = initEventListeners;