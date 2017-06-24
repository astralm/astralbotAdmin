import { expect } from 'chai';
import { fromJS, Map } from 'immutable';
import reducer from '../../src/reducers/appReducer.js';

describe('Проверка события LOGOUT', () => {
	it('Проверка на возвращаемое значение', () => {
		const action = {
						type: "LOGOUT"
					},
					state = fromJS({
						user: {
							status: true,
							email: 'simple@gmail.com',
							password: 'simple',
							phone: '78923421234',
							mobile_hash: 'qwdqdqwdqwdqwdqwdqw'
						}
					});
		expect(reducer(state, action)).to.equal(fromJS({
			user: {
				status: false,
				email: 'simple@gmail.com',
				password: 'simple',
				phone: '78923421234',
				mobile_hash: 'qwdqdqwdqwdqwdqwdqw'
			}
		}));
	});
	describe('Проверка на пустой state и state.user.status', () => {
		it('Пустой state', () => {
			const action = {
				type: 'LOGOUT'
			};
			expect(reducer(Map(), action)).to.equal(fromJS({
				user: {
					status: false
				}
			}));
		});
		it('Пустой status', () => {
			const action = {
							type: "LOGOUT"
						},
						state = fromJS({
							user: {
								name: 'John'
							}
						});
			expect(reducer(state, action)).to.equal(fromJS({
				user: {
					name: 'John',
					status: false
				}
			}));
		});
	});
});