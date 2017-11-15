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
      socket.emit(types.GET_USERS, state.getIn(['user', 'organization_id']));
      break;
    case types.GET_USER :
      socket.emit(types.GET_USER, action.user_email);
      break;
    case types.SET_USER :
      socket.emit(types.SET_USER, {
        email: action.email,
        password: action.password,
        name: action.name,
        organization_id: action.organization_id
	    });
      break;
    case types.BIND_SESSION :
      socket.emit(types.BIND_SESSION, {
        user_id: action.user_id,
        session_id: action.session_id,
        organization_id: state.getIn(['user', 'organization_id'])
      });
      break;
    case types.UNBIND_SESSION :
      socket.emit(types.UNBIND_SESSION, {
        user_id: action.user_id,
        session_id: action.session_id,
        organization_id: state.getIn(['user', 'organization_id'])
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
        offset: action.offset,
        firstDate: action.firstDate,
        secondDate: action.secondDate,
        organization_id: state.getIn(['user', 'organization_id']),
        user_id: state.getIn(['user', 'id'])
      });
      break;
    case types.SET_FILTER :
      if(!action.user_id)
        action.user_id = state.getIn(['user', 'id']);
      socket.emit(types.SET_FILTER, action);
      break;
    case types.GET_BOT_STATUS :
      socket.emit(types.GET_BOT_STATUS, {
        session_id: action.id
      });
      break;
    case types.REMOVE_ERROR_SESSION :
      socket.emit(types.REMOVE_ERROR_SESSION, {
        session_id: action.session_id,
        session_hash: action.session_hash
      });
      break;
    case types.SEND_EMAIL :
      socket.emit(types.SEND_EMAIL, action.email);
      break;
    case types.DELETE_DISPATCH : 
      socket.emit(types.DELETE_DISPATCH, {
        dispatch_id: action.dispatch_id,
        organization_id: state.getIn(["user", "organization_id"])
      });
      break;
    case types.NEW_DISPATCH :
      socket.emit(types.NEW_DISPATCH, {
        dispatch_widget: action.dispatch_widget,
        dispatch_telegram: action.dispatch_telegram,
        dispatch_message: action.dispatch_message,
        user_id: state.getIn(['user', 'id']),
        dispatch_partner: action.dispatch_partner,
        dispatch_faq: action.dispatch_faq,
        dispatch_sale: action.dispatch_sale,
        organization_id: state.getIn(['user', 'organization_id'])
      });
      break;
    case types.GET_DISPATCHES :
      socket.emit(types.GET_DISPATCHES, state.getIn(['user', 'organization_id']));
      break;
    case types.GET_CLIENTS :
      socket.emit(types.GET_CLIENTS, state.getIn(['user', 'organization_id']));
      break;
    case types.GET_CLIENT :
      socket.emit(types.GET_CLIENT, action.client_id);
      break;
    case types.UPDATE_CLIENT_INFORMATION:
      socket.emit(types.UPDATE_CLIENT_INFORMATION, action.result);
      break;
    case types.GET_ORGANIZATIONS :
      socket.emit(types.GET_ORGANIZATIONS);
      break;
    case types.GET_ORGANIZATION :
      socket.emit(types.GET_ORGANIZATION, action.organization_id);
      break;
    case types.UPDATE_ORGANIZATION_INFORMATION :
      socket.emit(types.UPDATE_ORGANIZATION_INFORMATION, action.result);
      break;
    case types.CREATE_ORGANIZATION :
      socket.emit(types.CREATE_ORGANIZATION, {
        organization_name: action.organization_name,
        organization_site: action.organization_site,
        organization_root: action.organization_root
      });
      break;
    case types.GET_USER_ORGANIZATION :
      socket.emit(types.GET_USER_ORGANIZATION, action.user_id);
      break;
	}
	return next(action);
}