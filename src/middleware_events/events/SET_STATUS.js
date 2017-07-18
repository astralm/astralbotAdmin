import * as Types from '../../constants/ActionTypes.js';
import { setStatus } from '../../actions/index.js';
export default store => data => {
	store.dispatch(setStatus(data));
}