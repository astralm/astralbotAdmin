import { status } from '../../actions/index.js';
export default (store, data) => {
	data == 1 ?
		store.dispatch(status(true)) :
		store.dispatch(status(false));
}