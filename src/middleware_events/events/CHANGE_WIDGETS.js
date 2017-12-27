import * as actions from './../../actions/index.js'
module.exports = store => data => {
	store.dispatch({
		type: "UPDATE_WIDGETS_STATUS"
	});
}