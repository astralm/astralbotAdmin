import { Map, fromJS } from 'immutable';
import * as Types from '../constants/ActionTypes.js';

const AppReducer = (state = Map(), action) => {
	switch(action.type){
		case Types.UPDATE_STATE :
			return state.mergeDeep(fromJS(JSON.parse(action.state)));
		case Types.SET_STATUS :
			return state.mergeDeep(fromJS({
				user: {
					status: action.status
				}
			}));
        case Types.SET_USERS :
            return state.mergeDeep(fromJS({
                users: action.users
            }));
		case Types.LOGIN : 
			return state.mergeDeep(fromJS({
				user: {
					email: action.email,
					password: action.password
				}
			}))
		case Types.UPDATE_USER : 
			return state.set('user', fromJS({
				email: action.email,
				password: action.password,
				name: action.name,
				status: action.status == 0 ? false : true,
				id: action.id
			}))
		case Types.SET_SESSIONS :
			return state.set('sessions', fromJS(action.sessions));
		default: 
			return state;
	}
}

module.exports = AppReducer;

