import { Map, fromJS } from 'immutable';
import * as types from '../constants/ActionTypes.js';

const AppReducer = (state = Map(), action) => {
	switch(action.type){
		case types.UPDATE_STATE :
			return state.merge(fromJS(typeof action.state == "string" ? 
				JSON.parse(action.state) : 
				action.state));
		case types.UPDATE_USER :
			return action.user ? 
				state.set('user', state.get('user') ? 
					state.get('user').merge(fromJS(action.user)) :
					fromJS(action.user)
				) : state;
		case types.STATUS : 
			return action.status ? 
				state.set('user', state.get('user') ?
					state.get('user').merge(fromJS({status: "online"})) :
					fromJS({status: "online"})
				) : state.set('user', state.get('user') ?
					state.get('user').merge(fromJS({status: "offline"})) :
					fromJS({status: "offline"})
				);
		case types.HASH :
			return action.hash ?
				state.set('session', state.get('session') ?
					state.get('session').merge(fromJS({hash: action.hash})) :
					fromJS({hash: action.hash})
				) : state;
		case types.LOGIN :
			return action.email && action.password ?
				state.set('user', state.get('user') ?
					state.get('user').merge(fromJS({email: action.email, password: action.password})) :
					fromJS({email: action.email, password: action.password})
				) : state;
		default: 
			return state;
	}
}

module.exports = AppReducer;

