import * as NumberMut from 'lib/redux-mut/number';
import * as AnyMut from 'lib/redux-mut/any';
import * as ObjectMut from 'lib/redux-mut/object';
import { Mutation } from 'lib/redux-mut';
import { CoreState } from 'module/Core';

export type State = CoreState & {
  counter: number;
};

export namespace CounterAction {
  const scope = ObjectMut.scope<State>('counter');

  export const init: Mutation<State> = scope(AnyMut.set(0));

  export const increment: Mutation<State> = scope(NumberMut.increment);
  export const decrement: Mutation<State> = scope(NumberMut.decrement);
}
