import * as types from 'constants/ActionTypes.js';
export default socket => store => next => action => {
	const state = store.getState().app
	switch (action.type){
		case types.LOGIN : {
			socket.emit(types.LOGIN, {
				hash: state.getIn(['session', 'hash']),
				email: action.email,
				password: action.password
			});
			break;
		}
		case types.LOGOUT : {
			socket.emit(types.SET_STATUS, {
				status_id: 2,
				hash: state.getIn(['session', 'hash'])	
			});
			break;
		}
	}
	return next(action);
}