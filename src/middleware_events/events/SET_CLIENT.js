import * as events from '../../actions/index.js';
module.exports = store => data => {
	store.dispatch(events.setClient(data || []));
}