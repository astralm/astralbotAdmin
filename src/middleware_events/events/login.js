import { updateUser, logout } from '../../actions/index.js';
export default (store, data) => {
	if(data != null){
		store.dispatch(updateUser({status: "online"}));
	} else {
		store.dispatch(logout());
	}
}