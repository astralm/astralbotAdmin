import * as Types from '../../constants/ActionTypes.js';
import { setUsers } from '../../actions/index.js';
export default store => data => {
	store.dispatch(setUsers(data));
}