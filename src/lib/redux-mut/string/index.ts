import { Mutation, createMutationReducer, reduceMutationReducers } from '../index';

export interface Set extends Mutation<string> {
  value: string;
}
const SET = 'string/set';
export const set = (value: string): Set => ({
  type: SET,
  value,
});
const incrementByReducer = createMutationReducer<Set>(SET, (s, m, r) => {
  return m.value;
});

export const empty = set('');

export const reducer = reduceMutationReducers(incrementByReducer);
