import * as events from '../../actions/index.js';
export default store => data => {
	let state = store.getState().app;
	if(state.get('notification')){
		let notification = Notification || window.Notification;
		if(notification.permission == "granted"){
			if(state.getIn(['session', 'dialog']).size != data.length && !data[data.length - 1].answer_message){
				let message = new notification("Новое сообщение в открытом диалоге: ", {
					body: data[data.length - 1].question_message,
					requireInteraction: true
				});
				message.onclick = () => {
					window.alert("Новое сообщение в открытом диалоге: " + data[data.length - 1].question_message);
				}
			}
		}
	}
	store.dispatch(events.setSessionDialog(data));
}