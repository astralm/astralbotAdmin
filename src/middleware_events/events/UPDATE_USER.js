import * as actions from '../../actions/index.js';
export default store => data => {
	if(data && data[0]){
		data = data[0];
		store.dispatch(actions.updateUser(data.user_email, data.user_password, data.user_name, data.user_status, data.user_id));
	}
}