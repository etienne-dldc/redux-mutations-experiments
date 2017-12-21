import { Reducer } from 'redux';

/**
 * Reduce reducers to reduce state in sequence.
 */
export function reduceReducers<T>(...reducers: Array<Reducer<Partial<T>>>): Reducer<T> {
  return (state: T, action: any): T => {
    return reducers.reduce((reducerState: T, reducer: Reducer<T>) => reducer(reducerState, action), state);
  };
}
