import * as events from '../../actions/index.js';
export default store => data => {
	store.dispatch(events.setOffset(data));
}