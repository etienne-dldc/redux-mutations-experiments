import { Mutation, createMutationReducer, reduceMutationReducers, mapValues } from '../index';

// Map
export interface Map<O extends object> extends Mutation<O> {
  mutations: { [K in keyof O]?: Mutation<O[K]> };
}
const MAP = 'object/map';
export const map = <O extends object>(mutations: { [K in keyof O]?: Mutation<O[K]> }): Map<O> => ({
  type: MAP,
  mutations,
});
const mapReducer = createMutationReducer<Map<object>>(MAP, (s, m, r) => {
  return mapValues(s, (val, key) => {
    const mutation = m.mutations[key as any];
    if (mutation) {
      return r(val, mutation);
    }
    return val;
  });
});

// UpdateIn
export interface UpdateIn<O extends object, K0 extends keyof O, K1 extends keyof O[K0]> extends Mutation<O> {
  mutation: Mutation<O[K0][K1]>;
  path: [K0, K1];
}
const UPDATE_IN = 'object/updateIn';
export const updateIn = <O extends object, K0 extends keyof O, K1 extends keyof O[K0]>(
  path: [K0, K1],
  mutation: Mutation<O[K0][K1]>
): UpdateIn<O, K0, K1> => ({
  type: UPDATE_IN,
  path,
  mutation,
});
const updateInReducer = createMutationReducer<UpdateIn<any, any, any>>(UPDATE_IN, (s, m, r) => {
  return {
    ...s,
    [m.path[0]]: {
      ...m.path[0],
      [m.path[1]]: r(m.path[1], m.mutation),
    },
  };
});

// UpdateIn
export interface Scope<O extends object, K0 extends keyof O> extends Mutation<O> {
  mutation: Mutation<O[K0]>;
  key: K0;
}
const SCOPE = 'object/scope';
export const scope = <O extends object, K0 extends keyof O = keyof O>(key: K0) => (
  mutation: Mutation<O[K0]>
): Scope<O, K0> => ({
  type: SCOPE,
  key,
  mutation,
});
const scopeReducer = createMutationReducer<Scope<any, any>>(SCOPE, (s, m, r) => {
  return {
    ...s,
    [m.key]: r(s[m.key], m.mutation),
  };
});

export const reducer = reduceMutationReducers(mapReducer, updateInReducer, scopeReducer);
