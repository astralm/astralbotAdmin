import * as events from '../../actions/index.js';
export default store => data => {
	var state = store.getState().app;
	if(state.getIn(['user', 'organization_id']) == state.getIn(['session', 'organization_id'])){
		store.dispatch(events.setSessionDialog(data));
	} else {
		store.dispatch(events.setSessionDialog([]));
	}
}