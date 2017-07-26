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
    case types.SET_USER :
        socket.emit(types.SET_USER, {
          email: action.email,
          password: action.password,
          name: action.name
		    });
        break;
    case types.GET_SESSIONS :
    	socket.emit(types.GET_SESSIONS, action.offset);
    	break;
   	case types.GET_ACTIVE_SESSIONS :
   		socket.emit(types.GET_ACTIVE_SESSIONS, action.offset);
   		break;
   	case types.GET_INACTIVE_SESSIONS :
   		socket.emit(types.GET_INACTIVE_SESSIONS, action.offset);
   		break;
   	case types.GET_FREE_SESSIONS :
   		socket.emit(types.GET_FREE_SESSIONS, action.offset);
   		break;
   	case types.GET_BUSY_SESSIONS :
   		socket.emit(types.GET_BUSY_SESSIONS, action.offset);
   		break;
   	case types.GET_ERROR_SESSIONS :
   		socket.emit(types.GET_ERROR_SESSIONS, action.offset);
   		break;
   	case types.GET_SUCCESS_SESSIONS :
   		socket.emit(types.GET_SUCCESS_SESSIONS, action.offset);
   		break;
   	case types.GET_USER_SESSIONS :
   		socket.emit(types.GET_USER_SESSIONS, {
        offset: action.offset,
        user_id: action.userId
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
	}
	return next(action);
}