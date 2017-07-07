import { getHash } from '../../actions/index.js';
export default (store, data) => {
	store.dispatch(getHash(data));
}