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
			}));
		case Types.UPDATE_USER : 
			return state.set('user', fromJS({
				email: action.email,
				password: action.password,
				name: action.name,
				status: action.status == 0 ? false : true,
				id: action.id,
				organization_id: action.organization_id,
				user_notification_hash: action.user_notification_hash,
				user_notification: action.user_notification
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
						case 'faq':
						case 'partner':
						case 'sale':
							var filterKey = [];
							if(action.filter == "faq"){
								filterKey.push(filters.indexOf("partner"));
								filterKey.push(filters.indexOf("sale"));
							} else if (action.filter == "partner"){
								filterKey.push(filters.indexOf("faq"));
								filterKey.push(filters.indexOf("sale"));
							} else if (action.filter == "sale"){
								filterKey.push(filters.indexOf("partner"));
								filterKey.push(filters.indexOf("faq"));
							}
							break;
						case 'telegram':
						case 'widget':
							var filterKey = filters.indexOf(action.filter == 'telegram' ? 'widget' : 'telegram');
							break;
						case 'today':
						case 'yesterday':
						case 'date':
							var filterKey = [];
							if(action.filter == "today"){
								filterKey.push(filters.indexOf("yesterday"));
								filterKey.push(filters.indexOf("date"));
							} else if (action.filter == "yesterday"){
								filterKey.push(filters.indexOf("today"));
								filterKey.push(filters.indexOf("date"));
							} else if (action.filter == "date"){
								filterKey.push(filters.indexOf("yesterday"));
								filterKey.push(filters.indexOf("today"));
							}
							break;
						case 'empty':
						case 'employed':
							var filterKey = filters.indexOf(action.filter == 'empty' ? 'employed' : 'empty');
					}
					if(typeof filterKey != "object" && filterKey > -1){
						filters = filters.delete(filterKey);
					} else if(typeof filterKey == "object" && filterKey.length > 0){
						filterKey.forEach(obj => {
							if(obj > -1){
								filters = filters.delete(obj);
							}
						});
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
		case Types.SET_BOT_STATUS :
			return state.set('session', state.get('session') ? state.get('session').set('bot', action.status) : fromJS({}));
		case Types.VALIDATE :
			return state.set('validate', action.validate);
		case Types.LOGOUT :
			return Map();
		case Types.MAIL_SENDED :
			return state.set('mail', action.status);
		case Types.SET_DISPATCHES : 
			return state.set('dispatches', fromJS(action.dispatches));
		case Types.SET_FIRST_DATE :
			return state.set('firstDate', fromJS(action.date));
		case Types.SET_SECOND_DATE :
			return state.set('secondDate', fromJS(action.date));
		case Types.SET_CLIENTS :
			return state.set('clients', fromJS(action.clients));
		case Types.SET_VIEW_CLIENT :
			return state.mergeDeep(fromJS({
				client: {
					client_id: action.client_id
				}
			}));
		case Types.SET_CLIENT :
			return state.mergeDeep(fromJS({
				client: action.client[0]
			}));
		case Types.SET_ORGANIZATIONS :
			return state.set('organizations', fromJS(action.organizations));
		case Types.SET_VIEW_ORGANIZATION :
			return state.mergeDeep(fromJS({
				organization: {
					organization_id: action.organization_id
				}
			}));
		case Types.SET_ORGANIZATION :
			return state.mergeDeep(fromJS({
				organization: action.organization[0]
			}));
		case Types.SET_USER_ORGANIZATION :
			return state.set('userOrganization', fromJS(action.userOrganization));
		default: 
			return state;
	}
}

module.exports = AppReducer;

