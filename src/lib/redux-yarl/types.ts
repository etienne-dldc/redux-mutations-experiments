import { StoreEnhancerStoreCreator, Reducer, Unsubscribe } from 'redux';

/**
 * An action can be
 *  - an object with a type key
 *  - a promise that resolve an action
 *  - a function that return an action
 *  - an array of any of the above
 */

type ArrayOrSelf<T> = Array<T> | T;

export type ActionObject<Type extends string = string> = {
  type: Type;
};

// should also allo to resolve to a promise but circular ref error...
// If you have error about this you can return () => myPromise or [myPromise] instead !
// C is some arbitrary value injected in createReduxYarlEnhancer, usually a container
export type ActionPromise<S, C> = Promise<ArrayOrSelf<ActionObject | ActionThunk<S, C> | null>>;

export type ActionThunk<S, C> = (
  state: S,
  container: C
) => ArrayOrSelf<ActionObject | ActionThunk<S, C> | ActionPromise<S, C> | null>;

export type Action<S, C> = ActionObject | ActionThunk<S, C> | ActionPromise<S, C>;

export type GetState<S> = () => S;

// export type Dispatch<A extends Dispatchable = Dispatchable> = (actions: A) => Promise<void>;
// action are not typed to make it work with React Redux connect
export type Dispatch = (actions: any) => Promise<void>;

export type DispatchCompat = (actions: any) => Promise<void>;

export type Dispatchable<S, C> = ArrayOrSelf<ActionObject | ActionThunk<S, C> | ActionPromise<S, C> | null>;
export type Detector<S, C> = (state: S, container: C) => Dispatchable<S, C>;
export type Detectors<S, C> = Array<Detector<S, C>>;
export type GetDetectors<S, C> = () => Detectors<S, C>;

export interface ReduxYarlStore<S, C> {
  dispatch: Dispatch;
  replaceDetectors(nextGetDetectors: GetDetectors<S, C>): void;
  replaceReducer(nextReducer: Reducer<S>): void;
  getState(): S;
  subscribe(listener: () => void): Unsubscribe;
}

export type StoreEnhancer<S, C> = (next: StoreEnhancerStoreCreator<S>) => StoreEnhancerReduxYarlStoreCreator<S, C>;
export type StoreEnhancerReduxYarlStoreCreator<S, C> = (reducer: Reducer<S>, preloadedState: S) => ReduxYarlStore<S, C>;
