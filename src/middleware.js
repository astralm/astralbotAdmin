import * as types from 'constants/ActionTypes.js';
export default socket => store => next => action => {
	const state = store.getState().app
	switch (action.type){
		case types.LOGIN:
			socket.emit(types.LOGIN, {
				email: action.email,
				password: action.password,
				hash: state.getIn(['session','hash'])
			});
			break;
		case types.FORGOT_PASSWORD:
			socket.emit(types.FORGOT_PASSWORD, {
				email: action.email
			});
			break;
		case types.GET_HASH:
			socket.emit(types.GET_HASH, {

			});
			break;
		case types.UPDATE_USER:
			if (action.user.hasOwnProperty('status'))
				socket.emit(types.SET_STATUS, {
					status: action.user.status,
					hash: state.getIn(['session','hash'])
				});
			break;
	}
	return next(action);
}