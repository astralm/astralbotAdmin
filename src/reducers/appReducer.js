import { Map, fromJS } from 'immutable';
import * as Types from '../constants/ActionTypes.js';

const AppReducer = (state = Map(), action) => {
	switch(action.type){
		case Types.UPDATE_STATE :
			return state.mergeDeep(fromJS(JSON.parse(action.state)));
		case Types.SET_STATUS :
			return state.mergeDeep(fromJS({
				user: {
					status: action.status
				}
			}));
        case Types.SET_USERS :
            return state.merge(fromJS({
                users: action.users,
                onlineUsers: action.users.filter(user => { return +user.user_status == 1 }),
                offlineUsers: action.users.filter(user => { return +user.user_status == 0 })
            }));
		case Types.LOGIN : 
			return state.mergeDeep(fromJS({
				user: {
					email: action.email,
					password: action.password
				}
			}))
		case Types.UPDATE_USER : 
			return state.set('user', fromJS({
				email: action.email,
				password: action.password,
				name: action.name,
				status: action.status == 0 ? false : true,
				id: action.id
			}))
		case Types.SET_SESSIONS :
		case Types.SET_USER_SESSIONS :
		case Types.SET_FREE_SESSIONS :
		case Types.SET_BUSY_SESSIONS :
		case Types.SET_SUCCESS_SESSIONS :
		case Types.SET_ERROR_SESSIONS :
		case Types.SET_ACTIVE_SESSIONS :
		case Types.SET_INACTIVE_SESSIONS :
			return state.set('sessions', fromJS(action.sessions));
		case Types.SET_OFFSET :
			return state.set('offset', action.offset);
		case Types.SET_SWITCH :
			return state.set('switch', action.switch);
		case Types.SET_VIEW_SESSION :
			return state.mergeDeep(fromJS({
				session: {
					session_id: action.session_id
				}
			}));
		case Types.SET_SESSION_INFO :
			return state.mergeDeep(fromJS({
				session: action.session[0]
			}));
		case Types.SET_SESSION_DIALOG :
			return state.mergeDeep(fromJS({
				session: {
					dialog: action.dialog
				}
			}));
		default: 
			return state;
	}
}

module.exports = AppReducer;

