import * as types from 'constants/ActionTypes.js';
export default socket => store => next => action => {
	const state = store.getState().app;
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
    case types.SET_USER :
      socket.emit(types.SET_USER, {
        email: action.email,
        password: action.password,
        name: action.name
	    });
      break;
    case types.BIND_SESSION :
      socket.emit(types.BIND_SESSION, {
        user_id: action.user_id,
        session_id: action.session_id
      });
      break;
    case types.UNBIND_SESSION :
      socket.emit(types.UNBIND_SESSION, {
        user_id: action.user_id,
        session_id: action.session_id
      });
      break;
    case types.GET_SESSION_INFO :
      socket.emit(types.GET_SESSION_INFO, action.session_id);
      break;
    case types.GET_SESSION_DIALOG :
      socket.emit(types.GET_SESSION_DIALOG, action.session_id);
      break;
    case types.SET_ANSWER :
      socket.emit(types.SET_ANSWER, {
        hash: action.hash,
        message: action.message,
        session_id: action.session_id
      });
      break;
    case types.START_BOT :
      socket.emit(types.START_BOT, action.session_id);
      break;
    case types.STOP_BOT :
      socket.emit(types.STOP_BOT, action.session_id);
      break;
    case types.UPDATE_USER_INFORMATION:
      socket.emit(types.UPDATE_USER_INFORMATION, {
        email: action.email,
        password: action.password,
        name: action.name
      });
      break;
    case types.GET_SESSIONS :
      socket.emit(types.GET_SESSIONS, {
        filters: action.filters,
        order: action.order,
        offset: action.offset
      });
      break;
    case types.SET_FILTER :
      socket.emit(types.SET_FILTER, action);
      break;
    case types.GET_BOT_STATUS :
      socket.emit(types.GET_BOT_STATUS, {
        session_id: action.id
      });
      break;
	}
	return next(action);
}