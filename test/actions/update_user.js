import { expect } from 'chai';
import reducer from '../../src/reducers/appReducer.js';
import { fromJS, Map } from 'immutable';

describe('Проверка события UPDATE_USER', () => {
	it('Проверка на возвращаемое значение', () => {
		let action = {
					type: 'UPDATE_USER',
					user: fromJS({
						name: 'baz',
						password: 'biz'
					})
				},
				state = fromJS({
					user: {
						name: 'foo',
						email: 'bar'
					}
				});

		expect(reducer(state, action)).to.equal(fromJS({
			user: {
				name: 'baz',
				password: 'biz',
				email: 'bar'
			}
		}));
	});
	describe('Проверка на undefined, null и вызов без параметров', () => {
		it('undefined', () => {
			let action = {
				type: 'UPDATE_USER',
				user: undefined
			};
			expect(reducer(Map(), action)).to.equal(Map());
		});
		it('null', () => {
			let action = {
				type: 'UPDATE_USER',
				user: null
			};
			expect(reducer(Map(), action)).to.equal(Map());
		});
		it('без параметров', () => {
			let action = {
				type: 'UPDATE_USER'
			};
			expect(reducer(Map(), action)).to.equal(Map());
		});
	})
})