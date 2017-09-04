import * as actions from '../../actions/index.js';
import {setViewSession} from '../../actions/index.js';
import {push} from 'react-router-redux';
export default store => data => {
	let state = store.getState().app;
	if(state.get('notification')){
		let notification = Notification || window.Notification;
		if(notification.permission == "granted" && data.length > 0){
			let sessions = state.get('sessions') ? state.get('sessions').toJS() : [],
				getSessionInData = session_id => {
					for(let j = 0; j < data.length; j++){
						let sessionInData = data[j];
						if(sessionInData.session_id == session_id){
							return sessionInData;
						}
					}
				},
				getMessage = (key, value) => {
					switch (key){
						case "answer":
							return "Новый ответ";
						case "question":
							return "Новый вопрос";
						case "session_error":
							return !value ? "Бот не смог подобрать ответ" : "Ошибки больше нет";
						case "session_status": 
							return value ? "Сессия стала неактивной" : "Сессия стала активной";
						case "user_name":
							return value ? ("Сессия занята пользователем '" + value + "'") : "Сессия стала свободна";
						default :
							return "";
					}
				};
			for (let i = 0; i < sessions.length; i++){
				let session = sessions[i],
					sessionInData = getSessionInData(session.session_id);
				if(session && sessionInData){	
					for (let key in session){
						let value = session[key],
							text = getMessage(key, sessionInData[key]);
						if(sessionInData[key] != value && text){
							let message = new notification("Изменения в состоянии сессий: ", {
								body: "сессия " + session.session_id + ": " + text,
								requireInteraction: true
							});
							message.onclick = () => {
								if(store.getState().routing.locationBeforeTransitions.pathname.split("/app/")[1] != "dialog"){
									store.dispatch(setViewSession(session.session_id));
									store.dispatch(push('app/dialog'));
								}
								window.alert("Изменения в состоянии сессий: сессия " + session.session_id + ": " + text);
							}
						}
					}
				}
			}
		}
	}
	store.dispatch(actions.setSessions(data));
}