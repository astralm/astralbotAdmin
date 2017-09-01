import * as Types from '../../constants/ActionTypes.js';
import { setUsers } from '../../actions/index.js';
export default store => data => {
	let state = store.getState().app;
	if(state.get('notification')){
		let notification = Notification || window.Notification;
		if(notification.permission == "granted" && data[0]){
			let users = state.get('users').toJS(),
				getUserFromData = user_id => {
					for(let j = 0; j < data.length; j++){
						let userFromData = data[j];
						if(userFromData.user_id == user_id){
							return userFromData;
						}
					}
				};
			for(let i = 0; i < users.length; i++){
				let user = users[i],
					userFromData = getUserFromData(user.user_id),
					status = "",
					name = "",
					email = "";
				if(user.user_status != userFromData.user_status){
					status = !userFromData.user_status ? "Пользователь вышел из сети; " : "Пользователь вошел в сеть; ";
				}
				if(user.user_name != userFromData.user_name){
					name = "Пользователь сменил имя на '" + userFromData.user_name + "'; ";
				}
				if(user.user_email != userFromData.user_email){
					email = "Пользователь сменил почту на '" + userFromData.user_email + "'; ";
				}
				if(status || name || email){
					let message = new notification("Изменение информации пользователя '" + user.user_name + "'", {
						body: status + name + email,
						requireInteraction: true
					});
					message.onclick = () => {
						window.alert("Изменение информации пользователя '" + user.user_name + "': " + status + name + email);
					};
				}
			}
		}
	}
	store.dispatch(setUsers(data));
}