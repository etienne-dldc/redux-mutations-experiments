export interface Mutation<S> {
  // This enforce type
  __state?: S;
  type: string;
}

export type Reducer<S> = (state: S, mutation: Mutation<S>) => S;
export type ReduxReducer<S> = (state: S, action: any) => S;

export type MutationHandler<S> = (state: S, mutation: Mutation<S>, reducer: Reducer<any>) => S;

export function reduceMutationReducers<S>(...reducers: Array<MutationHandler<S>>): MutationHandler<S> {
  return (s, m, r) => {
    return reducers.reduce((acc, reducer) => {
      return reducer(acc, m, r);
    }, s);
  };
}

export function createReduxReducer<S = any>(mutationHandler: MutationHandler<any>): ReduxReducer<S> {
  function recursive<RS>(state: any, mutation: Mutation<any>): RS {
    return mutationHandler(state, mutation, (s: any, m: Mutation<any>) => {
      return recursive(s, m);
    });
  }
  return (state: S, mutation: Mutation<S>) => recursive(state, mutation);
}

export function mapValues<O extends object, Out extends { [K in keyof O]: any }>(
  obj: O,
  valueMapper: <K extends keyof O>(val: O[K], key: K) => Out[K]
): Out {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[key] = valueMapper(obj[key], key as any);
      return acc;
    },
    ({} as any) as Out
  );
}

export function createMutationReducer<M, S = any>(
  kind: string,
  handle: (s: S, m: M, r: Reducer<any>) => S
): MutationHandler<S> {
  return (s, m, r) => {
    if (m && m.type === kind) {
      return handle(s, m as any, r);
    }
    return s;
  };
}

/**
 * Demo
 */

// const reducer = createReducer(
//   createReducerFromModules(AnyMutation, UtilsMutation, NumberMutation, StringMutation, ObjectMutation)
// );

// const setValue = AnyMutation.set(20);

// function createStore<S>(state: S, reducer: Reducer<S>) {
//   let theState: S = state;
//   return {
//     dispatch: (mutation: Mutation<S>) => {
//       theState = reducer(theState, mutation);
//       return theState;
//     },
//   };
// }

// type S1 = number;

// const store1 = createStore<S1>(0, reducer);

// const setHello = StringMutation.set('hello');

// store1.dispatch(NumberMutation.decrement);

// type S2 = {
//   num: number;
//   str: string;
//   obj: {
//     num: number;
//   };
// };

// const store2 = createStore<S2>({ num: 0, str: '', obj: { num: 0 } }, reducer);

// const mutation2 = ObjectMutation.map({
//   num: NumberMutation.increment,
//   str: StringMutation.empty,
//   obj: ObjectMutation.map({
//     num: NumberMutation.incrementBy(30),
//   }),
// });

// store2.dispatch(mutation2);
// store2.dispatch(ObjectMutation.updateIn(['obj', 'num'], NumberMutation.decrement));
