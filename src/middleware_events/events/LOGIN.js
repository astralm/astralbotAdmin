import { status } from '../../actions/index.js';
export default (store, data) => {
	data ?
		store.dispatch(status(data)) :
		store.dispatch(status(false));
}
