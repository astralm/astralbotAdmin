import { status } from '../../actions/index.js';
export default (store, data) => {
	if (data) {
		store.dispatch(status(data));
	}
}
