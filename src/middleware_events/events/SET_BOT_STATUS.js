import * as events from '../../actions/index.js';
export default store => data => {
	store.dispatch(events.setBotStatus(data[0].bot_work));
}	