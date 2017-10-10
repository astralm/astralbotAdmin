import * as actions from '../../actions/index.js';
import {setViewSession} from '../../actions/index.js';
import {push} from 'react-router-redux';
export default store => data => {
	let state = store.getState().app;
	if(state.get('notification') && data){
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
				};
			for (let i = 0; i < sessions.length; i++){
				let session = sessions[i],
					sessionInData = getSessionInData(session.session_id);
				if(session && sessionInData){
					if(sessionInData.session_error && session.session_error != sessionInData.session_error){
						let message = new notification("сессия " + session.session_id + " :", {
								body: "Бот не смог подобрать ответ.",
								requireInteraction: true
							});
						message.onclick = () => {
							if(store.getState().routing.locationBeforeTransitions.pathname.split("/app/")[1] != "dialog"){
								store.dispatch(setViewSession(session.session_id));
								store.dispatch(push('app/dialog'));
							}
							window.alert("сессия " + session.session_id + " : Бот не смог подобрать ответ.");
						};
					}
				}
			}
			if(sessions.length <= 0 && data.length > 0){
				for(let i = 0; i < data.length; i++){
					let obj = data[i];
					if(obj.session_error){
						let message = new notification("сессия " + obj.session_id + " :", {
								body: "Бот не смог подобрать ответ.",
								requireInteraction: true
							});
						message.onclick = () => {
							if(store.getState().routing.locationBeforeTransitions.pathname.split("/app/")[1] != "dialog"){
								store.dispatch(setViewSession(obj.session_id));
								store.dispatch(push('app/dialog'));
							}
							window.alert("сессия " + obj.session_id + " : Бот не смог подобрать ответ.");
						};
					}
				}
			}
		}
	}
	store.dispatch(actions.setSessions(data));
}