import { Mutation, createMutationReducer, reduceMutationReducers } from '../index';

export interface IncrementBy extends Mutation<number> {
  amount: number;
}
const INCREMENT = 'number/increment';
export const incrementBy = (amount: number): IncrementBy => ({
  type: INCREMENT,
  amount,
});
const incrementByReducer = createMutationReducer<IncrementBy>(INCREMENT, (s, m, r) => {
  return s + m.amount;
});

// Aliases
export const increment = incrementBy(1);
export const decrement = incrementBy(-1);

export const reducer = reduceMutationReducers(incrementByReducer);
