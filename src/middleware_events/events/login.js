import { updateUser, logout } from '../../actions/index.js';
export default (store, data) => {
	if(data != null){
		data[0].status = true;
		store.dispatch(updateUser(data[0]));
	} else {
		store.dispatch(logout());
	}
}