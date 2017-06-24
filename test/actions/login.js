import { expect } from 'chai';
import reducer from '../../src/reducers/appReducer.js';
import { fromJS, Map } from 'immutable';
 
describe('Проверка события LOGIN', () => {
	it('Провека на возвращаемое значение', () => {
		let action = {
					type: 'LOGIN',
					email: 'foo',
					password: 'bar'
				},
				state = Map();
		expect(reducer(state, action)).to.equal(fromJS({
			user: {
				email: 'foo',
				password: 'bar'
			}
		}));
	});
	describe('Проверка на undefined, null и возврат без параметров', () => {
		it('undefined', () => {
			let action = {
				type: 'LOGIN',
				email: undefined,
				password: undefined
			};
			expect(reducer(Map(), action)).to.equal(Map());
		});
		it('null', () => {
			let action = {
				type: 'LOGIN',
				email: null,
				password: null
			};
			expect(reducer(Map(), action)).to.equal(Map());
		});
		it('без параметров', () => {
			let action = {
				type: 'LOGIN'
			};
			expect(reducer(Map(), action)).to.equal(Map());
		});
	})
})