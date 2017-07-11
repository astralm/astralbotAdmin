import { Hash, login } from '../../actions/index.js';
export default (store, data) => {
	store.dispatch(Hash(data));
	var state = store.getState().app;
	store.dispatch(login(state.getIn(['user', 'email']), state.getIn(['user', 'password'])));
}