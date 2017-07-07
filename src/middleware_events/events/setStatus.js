import { updateUser } from '../../actions/index.js';
export default (store, data) => {
	store.dispatch(updateUser({status: data}));
}