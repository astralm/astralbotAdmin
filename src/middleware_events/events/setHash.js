import { setHash } from '../../actions/index.js';
export default (store, data) => {
	store.dispatch(setHash(data));
}