import { expect } from 'chai';
import { Map, fromJS } from 'immutable';
import reducer from '../../src/reducers/appReducer.js';

describe('Проверка действия UPDATE_STATE', () => {
	it('Проверка на возвращаемое значение', () => {
		let action = {
					type: 'UPDATE_STATE',
					state: fromJS({
						user: {
							name: "foo"
						},
						bar: "baz"
					})
				},
				state = fromJS({
					baz: "biz",
					user: {
						name: "bar",
						email: "foo"
					}
				});
		expect(reducer(state, action)).to.equal(fromJS({
			baz: "biz",
			user: {
				name: "foo"
			},
			bar: "baz"
		}));
	});
	describe('Проверка на undefined, null, пустое значение и JSON строку', () => {
		it('undefined', () => {
			let action = {
				type: 'UPDATE_STATE',
				state: undefined
			};
			expect(reducer(Map(), action)).to.equal(Map());
		});
		it('null', () => {
			let action = {
				type: 'UPDATE_STATE',
				state: null
			};
			expect(reducer(Map(), action)).to.equal(Map());
		});
		it('Пустое значение', () => {
			let action = {
				type: 'UPDATE_STATE'
			};
			expect(reducer(Map(), action)).to.equal(Map());
		});
		it('JSON строка', () => {
			let action = {
				type: 'UPDATE_STATE',
				state: '{"user":{"name":"foo"}}'
			};
			expect(reducer(Map(), action)).to.equal(fromJS({
				user: {
					name: "foo"
				}
			}));
		})
	})
});