import {setDispatches} from '../../actions/index.js';
export default store => data => {
	store.dispatch(setDispatches(data || []));
}