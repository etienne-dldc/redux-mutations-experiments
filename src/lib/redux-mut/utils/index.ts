import { Mutation, createMutationReducer, reduceMutationReducers } from '../index';

// Named
export interface Named<S> extends Mutation<S> {
  name: string;
  mutation: Mutation<S>;
}
const NAMED = 'utils/named';
export const named = <S>(name: string, mutation: Mutation<S>): Named<S> => ({
  type: NAMED,
  name,
  mutation,
});
export const namedReducer = createMutationReducer<Named<any>>(NAMED, (s, m, r) => {
  return r(s, m.mutation);
});

export const reducer = reduceMutationReducers(namedReducer);
