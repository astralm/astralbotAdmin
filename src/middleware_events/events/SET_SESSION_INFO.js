import * as actions from '../../actions/index.js';
export default store => data => {
	var state = store.getState().app;
	if(state.getIn(['user', 'organization_id']) == data[0].organization_id){
		store.dispatch(actions.setSessionInfo(data));
	} else {
		store.dispatch(actions.setSessionInfo([]));
	}
}