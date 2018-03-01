import { push } from 'react-router-redux';
const initEventListeners = (socket, store) => {
	socket.on("message", data => {
		for(let key in data){
			switch(data[key].action){
				case "changePage": 
					window.location.hash = `#/${data[key].data.page}`;
				break;
				case "notification": 
					let notification = Notification || window.Notification;
					if(notification.permission == "granted"){
						let props = data[key].data;
						let message = new notification(props.title, {
							body: props.body,
							requireInteraction: props.requireInteraction
						});
						if(props.onclick){
							let state = store.getState().app;
							message.onclick = () => {
								console.log(this);
								store.dispatch({
									type: "Query",
									middleware: true,
									data: {
										query: "changePage",
										values: [
											state.getIn(["user", "hash"]),
											state.getIn(["socket", "hash"]),
											props.page_id,
											props.item_id
										]
									}
								});
								window.alert(props.title + ": " + props.body);
								message.close();
							};
						}
					}
				break;
				default: 
					store.dispatch({
						type: data[key].action,
						data: data[key].data
					});
				break;
			}
		}
	});
	socket.on("disconnect", () => {
		store.dispatch({
			type: "mergeDeep",
			data: {
				loginMessage: "Соединение с сервером потеряно",
				user: false
			}
		});
	});
}
module.exports = initEventListeners;