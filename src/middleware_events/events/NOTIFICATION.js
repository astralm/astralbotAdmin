import {push} from 'react-router-redux';
import * as actions from './../../actions/index.js';
export default store => data => {
	let state = store.getState().app;
	if(state.get('notification') && data){
		let notification = Notification || window.Notification;
		if(notification.permission == "granted"){
			let message = new notification(data.title, {
				body: data.body,
				requireInteraction: data.requireInteraction
			});
			if(data.session_id){
				message.onclick = () => {
					store.dispatch(actions.setViewSession(data.session_id));
					store.dispatch(push('app/dialog'));
					window.alert(data.title + ": " + data.body);
				};
			}
		}
	}
}