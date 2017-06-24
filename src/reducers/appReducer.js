import { Map, fromJS } from 'immutable';
import * as types from '../constants/ActionTypes.js';

const AppReducer = (state = Map(), action) => {
	switch(action.type){
		case types.UPDATE_STATE :
			return state.merge(fromJS(typeof action.state == "string" ? 
				JSON.parse(action.state) : 
				action.state));
		case types.LOGIN : 
			return action.email && action.password ? 
				(state.set('user', state.get('user') ? 
					state.get('user').merge(fromJS({
						email: action.email,
						password: action.password
					})) : 
					fromJS({
						email: action.email,
						password: action.password
					}))
				) : 
				state;
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
		default: 
			return state;
	}
}

module.exports = AppReducer;

