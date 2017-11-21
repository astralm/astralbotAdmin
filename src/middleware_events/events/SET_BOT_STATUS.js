import * as events from '../../actions/index.js';
export default store => data => {
	let state = store.getState().app;
	if(state.getIn(['user', 'organization_id']) == state.getIn(['session', 'organization_id'])){
		store.dispatch(events.setBotStatus(data[0].bot_work));
	}
}	