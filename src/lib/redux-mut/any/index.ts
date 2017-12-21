import { Mutation, createMutationReducer, reduceMutationReducers } from '../index';

// Set
export interface Set<S> extends Mutation<S> {
  value: S;
}
const SET = 'any/set';
export const set = <S>(val: S): Set<S> => ({
  type: SET,
  value: val,
});
export const setReducer = createMutationReducer<Set<any>>(SET, (s, m, r) => {
  return m.value;
});

// Aliases

export const setNull = () => set(null);
export const setTrue = () => set(true);
export const setFalse = () => set(false);

export const reducer = reduceMutationReducers(setReducer);
