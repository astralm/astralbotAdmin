import * as Types from '../../constants/ActionTypes.js';
import { setStatus, validate } from '../../actions/index.js';
export default store => data => {
	if(data == false && data != undefined){
		store.dispatch(validate(true));
	} else {
		store.dispatch(validate(false));
	}
	store.dispatch(setStatus(data));
}