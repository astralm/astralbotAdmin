import * as types from 'constants/ActionTypes.js';
export default socket => store => next => action => {
	const state = store.getState().app
	switch (action.type){
		case types.LOGIN :
			socket.emit(types.LOGIN, {
				email: action.email,
				password: action.password
			});
			break;
		case types.LOGOUT :
			socket.emit(types.LOGOUT);
			break;
        case types.GET_USERS :
            socket.emit(types.GET_USERS);
            break;
	}
	return next(action);
}