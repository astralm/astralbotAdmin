import * as events from '../../actions/index.js';
import {push} from 'react-router-redux';
export default store => data => {
	store.dispatch(events.mailSended(data));
	store.dispatch(push('/confirm-email'));
}