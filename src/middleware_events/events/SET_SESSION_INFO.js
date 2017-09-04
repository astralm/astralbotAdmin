import * as actions from '../../actions/index.js';
export default store => data => {
	let state = store.getState().app;
	if(state.get('notification')){
		let notification = Notification || window.Notification;
		if(notification.permission == "granted" && data[0]){
			let session = state.get('session') ? state.get('session').toJS() : {};
			if(data[0].session_error != session.session_error || data[0].session_status != session.session_status || data[0].user_id != session.user_id){
				let error, status, user;
				if(data[0].session_error != session.session_error){
					error = !data[0].session_error ? "Бот не смог подобрать ответ; " : "Ошибка разрешилась; ";
				} else {
					error = false;
				}
				if(data[0].session_status != session.session_status){
					status = data[0].session_status ? "Сессия активна; " : "Сессия больше не активна; ";
				} else {
					status = false;
				}
				if(data[0].user_id != session.user_id){
					user = data[0].user_id == 0 ? "Сессия стала свободна; " : ("Сессия занята констультантом '" + data[0].user_name + "'; ");
				}
				let message = new notification("изменение состояния открытой сессии: ",{
					body: (error || "") + (status || "") + (user || ""),
					requireInteraction: true
				});
				message.onclick = () => {
					window.alert("изменение состояния открытой сессии: " + (error || "") + (status || "") + (user || ""));
				};
			}
		}
	}
	store.dispatch(actions.setSessionInfo(data));
}