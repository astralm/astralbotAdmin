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
			}));
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
			return state.set('session', state.get('session').merge(fromJS({
				dialog: action.dialog
			})));
		case Types.SET_SESSIONS :
			return state.set('sessions', fromJS(action.sessions));
		case Types.SET_FILTER :
			if(action.filter != "all"){
				var filters = state.get('filters') || fromJS([]),
					key = filters.indexOf(action.filter);
				if(action.filter){
					switch(action.filter){
						case 'active':
						case 'inactive': 
							var filterKey = filters.indexOf(action.filter == 'active' ? 'inactive' : 'active');
							break;
						case 'error':
						case 'success':
							var filterKey = filters.indexOf(action.filter == 'error' ? 'success' : 'error');
							break;
						case 'free':
						case 'busy':
							var filterKey = filters.indexOf(action.filter == 'free' ? 'busy' : 'free');
							break;
						case 'user':
							var filterKey = filters.indexOf('free');
							break;
					}
					if(filterKey > -1){
						filters = filters.delete(filterKey);
					}
					if(key > -1){
						filters = filters.delete(key);
					} else {
						filters = filters.push(action.filter);
					}
				}
			} else {
				var filters = fromJS([]);
			}
			return state.merge(fromJS({
				filters: filters,
				offset: action.offset,
				order: action.order
			}));
		case Types.INIT_NOTIFICATION :
			let notification = Notification || window.Notification;
			if(notification){
				notification.requestPermission();
			}
			return notification ? state.set("notification", true) : state.set("notification", false);
		default: 
			return state;
	}
}

module.exports = AppReducer;

