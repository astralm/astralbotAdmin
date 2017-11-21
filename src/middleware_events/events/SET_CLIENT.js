import * as events from '../../actions/index.js';
module.exports = store => data => {
	let state = store.getState().app;
	if(state.getIn(['user', 'organization_id']) == data[0].organization_id){
		store.dispatch(events.setClient(data));
	} else {
		store.dispatch(events.setClient([]));
	}
}