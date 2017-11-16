import * as actions from '../../actions/index.js';
export default store => data => {
	store.dispatch(actions.setSessionInfo(data));
}