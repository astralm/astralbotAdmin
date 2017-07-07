import { Map, fromJS } from 'immutable';
import * as types from '../constants/ActionTypes.js';

const AppReducer = (state = Map(), action) => {
	switch(action.type){
		case types.UPDATE_STATE :
			return state.merge(fromJS(typeof action.state == "string" ? 
				JSON.parse(action.state) : 
				action.state));
		case types.LOGOUT :
			return state.set('user', state.get('user') ? 
				state.get('user').set('status', false) : 
				fromJS({status: false}));
		case types.UPDATE_USER :
			return action.user ? 
				state.set('user', state.get('user') ? 
					state.get('user').merge(fromJS(action.user)) :
					fromJS(action.user)
				) : state;
		case types.SET_HASH :
			return action.hash ?
				state.set('session', state.get('session') ?
					state.get('session').merge(fromJS({hash: action.hash})) :
					fromJS({hash: action.hash})
				) : state;
		default: 
			return state;
	}
}

module.exports = AppReducer;

