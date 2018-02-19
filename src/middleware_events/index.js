import { push } from 'react-router-redux';
const initEventListeners = (socket, store) => {
	socket.on("message", data => {
		for(let key in data){
			if (data[key].action != "changePage"){
				store.dispatch({
					type: data[key].action,
					data: data[key].data
				});
			} else {
				console.log(`#/${data[key].data.page}`);
				window.location.hash = `#/${data[key].data.page}`;
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