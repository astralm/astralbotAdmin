import * as types from 'constants/ActionTypes.js';
export default socket => store => next => action => {
	const state = store.getState().app
	switch (action.type){
		case types.LOGIN:
			socket.emit(types.LOGIN, {
				email: action.email,
				password: action.password
			});
			break;
		case types.FORGOT_PASSWORD:
			socket.emit(types.FORGOT_PASSWORD, {
				email: action.email
			});
			break;
	}
	return next(action);
}