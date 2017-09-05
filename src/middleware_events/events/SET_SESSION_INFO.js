import * as actions from '../../actions/index.js';
export default store => data => {
	let state = store.getState().app;
	if(state.get('notification')){
		let notification = Notification || window.Notification;
		if(notification.permission == "granted" && data[0]){
			let session = state.get('session') ? state.get('session').toJS() : {};
			if(data[0].session_error && data[0].session_error != session.session_error){
				let message = new notification("Сессия "+session.session_id+" : ",{
					body: "Бот не смог подобрать ответ.",
					requireInteraction: true
				});
				message.onclick = () => {
					window.alert("Сессия "+session.session_id+" : Бот не смог подобрать ответ.");
				};
			}
		}
	}
	store.dispatch(actions.setSessionInfo(data));
}