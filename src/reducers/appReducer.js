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
		case Types.SET_OFFSET :
			return state.set('offset', action.offset);
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
			console.log(action);
			return state.set('session', state.get('session').merge(fromJS({
				dialog: action.dialog
			})));
		case Types.SET_FILTER: 
			state = state.get('filters') ? state : state.set('filters', fromJS([]));
			switch(action.filter){
				case "all":
					return state.set('filters', fromJS([]));
				case "active": {
					let index = state.get('filters').findIndex(item => (
						item.get('type') == 'active'
					));
					return index > -1 ? state.set('filters', state.get('filters').delete(index)) :
						state.set('filters', state.get('filters').push(fromJS({
							name: 'session_status',
							value: 1,
							type: 'active'
						})));
				}
				case "inactive": {
					let index = state.get('filters').findIndex(item => (
						item.get('type') == 'inactive'
					)); 
					return index > -1 ? state.set("filters", state.get('filters').delete(index)) :
						state.set("filters", state.get('filters').push(fromJS({
							name: 'session_status',
							value: 0,
							type: 'inactive'
						})));
				}
				case "free": {
					let index = state.get('filters').findIndex(item => (
						item.get('type') == 'free'
					)); 
					return index > -1 ? state.set("filters", state.get('filters').delete(index)) :
						state.set("filters", state.get('filters').push(fromJS({
							name: 'user_id',
							value: 0,
							type: 'free'
						})));
				}
				case "busy": {
					let index = state.get('filters').findIndex(item => (
						item.get('type') == 'busy'
					)); 
					return index > -1 ? state.set("filters", state.get('filters').delete(index)) :
						state.set("filters", state.get('filters').push(fromJS({
							name: 'user_id',
							value: 0,
							symbol: ">",
							type: 'busy'
						})));
				}
				case "error": {
					let index = state.get('filters').findIndex(item => (
						item.get('type') == 'error'
					)); 
					return index > -1 ? state.set("filters", state.get('filters').delete(index)) :
						state.set("filters", state.get('filters').push(fromJS({
							name: 'session_error',
							value: 1,
							type: 'error'
						})));
				}
				case "success": {
					let index = state.get('filters').findIndex(item => (
						item.get('type') == 'success'
					)); 
					return index > -1 ? state.set("filters", state.get('filters').delete(index)) :
						state.set("filters", state.get('filters').push(fromJS({
							name: 'session_error',
							value: 0,
							type: 'success'
						})));
				}
				case "user": {
					let index = state.get('filters').findIndex(item => (
						item.get('type') == 'user'
					)); 
					return index > -1 ? state.set("filters", state.get('filters').delete(index)) :
						state.set("filters", state.get('filters').push(fromJS({
							name: 'user_id',
							value: action.user_id,
							type: 'user'
						})));
				}
				default:
					return state;
			}	
		default: 
			return state;
	}
}

module.exports = AppReducer;

