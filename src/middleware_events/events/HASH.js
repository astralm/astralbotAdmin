import { Hash } from '../../actions/index.js';
export default (store, data) => {
	store.dispatch(Hash(data));
}