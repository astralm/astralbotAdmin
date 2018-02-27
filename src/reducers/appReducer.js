import { Map, fromJS } from 'immutable';
import * as Types from '../constants/ActionTypes.js';

const AppReducer = (state = Map(), action) => {
	switch(action.type){
		case Types.SET_STATE:
			return fromJS(action.data);
		case Types.MERGE_DEEP:
			return state.mergeDeep(fromJS(action.data));
		case Types.MERGE:
			return state.merge(fromJS(action.data));
		case Types.SET_LOCAL:
			Object.assign(localStorage, action.data);
			return state;
		case Types.DELETE_LOCAL:
			localStorage.removeItem(action.data);
			return state;
		case Types.PUSH:
			return state.setIn(action.data.keys, state.getIn(action.data.keys).push(fromJS(action.data.value)));
		case Types.NOTIFICATION:
				let notification = Notification || window.Notification;
				if(notification.permission == "granted"){
					let data = action.data;
					let message = new notification(data.title, {
						body: data.body,
						requireInteraction: data.requireInteraction
					});
					if(data.session_id){
						message.onclick = () => {
							store.dispatch({
								type: "Query",
								middleware: true,
								data: {
									query: "changePage",
									values: [
										state.getIn(["user", "hash"]),
										state.getIn(["socket", "hash"]),
										data.page_id,
										data.item_id
									]
								}
							});
							window.alert(data.title + ": " + data.body);
						};
					}
				}
			return state;
		default: 
			return state;
	}
}

module.exports = AppReducer;

