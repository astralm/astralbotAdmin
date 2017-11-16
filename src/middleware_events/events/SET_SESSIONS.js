import * as actions from '../../actions/index.js';
import {setViewSession} from '../../actions/index.js';
import {push} from 'react-router-redux';
export default store => data => {
	store.dispatch(actions.setSessions(data));
}