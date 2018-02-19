import * as types from 'constants/ActionTypes.js';
export default socket => store => next => action => {
	if(action.middleware){
		socket.send({
			type: action.type,
			data: action.data
		});
	}
	return next(action);
}