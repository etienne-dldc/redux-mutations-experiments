import { StoreEnhancerStoreCreator, Store, Reducer } from 'redux';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import isNil from 'lodash/isNil';

import {
  Dispatchable,
  Detectors,
  Dispatch,
  GetState,
  ActionThunk,
  ActionObject,
  GetDetectors,
  StoreEnhancer,
  StoreEnhancerReduxYarlStoreCreator,
  ReduxYarlStore,
} from './types';

export function isNotActions(actions: Dispatchable<any, any>): boolean {
  if (isArray(actions)) {
    return actions.length === 0;
  }
  return actions === null;
}

export function runDetector<S, C>(
  detectors: Detectors<S, C>,
  dispatch: Dispatch,
  getState: GetState<S>,
  container: C
): void {
  if (detectors.length === 0) {
    return;
  }
  // when a detector n return something, we dispatch that result and start over the for loop
  // but we start at n+1 so one detector is not called more than the others
  // In other words, we loop over detector until all of then return nothing
  let offset: number = 0;
  let loopSafety = 500;
  while (loopSafety > 0) {
    loopSafety--;
    // offset is where we start the loop
    // index is where we are in the loop
    let index = 0;
    for (index = 0; index < detectors.length; index++) {
      // using modulo to get valid indexes
      const offsetIndex = (offset + index) % detectors.length;
      const detector = detectors[offsetIndex];
      let detectorResult = null;
      detectorResult = detector(getState(), container);
      if (!isNotActions(detectorResult)) {
        offset = offsetIndex + 1;
        const prevState = getState();
        dispatch(detectorResult);
        const newState = getState();
        if (prevState !== newState) {
          // If the state has change, we stop the for and start over
          break; // stop the for
        }
        // if the detector result made no change to the state we keep going the loop
        // just like if it has returned null
      }
    }
    // true when all detector didn't change the state
    if (index === detectors.length) {
      break; // stop the while
    }
  }
}

export function isActionThunk<S, C>(maybeActionThunk: any): maybeActionThunk is ActionThunk<S, C> {
  return isFunction(maybeActionThunk);
}

export function isActionObject(maybeActionObject: any): maybeActionObject is ActionObject {
  return !isPromise(maybeActionObject) && isPlainObject(maybeActionObject) && !isNil(maybeActionObject.type);
}

export function isPromise<T = any>(maybePromise: any): maybePromise is Promise<T> {
  // A Promise.resolve return the value if and only if the value is a promise
  return Promise.resolve(maybePromise) === maybePromise;
}

export function createReduxYarlEnhancer<S, C>(getDetectors: GetDetectors<S, C>, container: C): StoreEnhancer<S, C> {
  if (!isFunction(getDetectors)) {
    throw new Error('Expect detectors to be an array.');
  }

  return function reduxYarlEnhancer(next: StoreEnhancerStoreCreator<S>): StoreEnhancerReduxYarlStoreCreator<S, C> {
    return function reduxYarlStoreCreator(reducer: Reducer<S>, preloadedState: S): ReduxYarlStore<S, C> {
      // first create basic store
      const store: Store<S> = next(reducer, preloadedState);

      let currentGetDetectors: GetDetectors<S, C> = getDetectors;
      let detectorRunning: boolean = false;

      const { dispatch, ...otherStoreMethods } = store;

      function replaceDetectors(nextGetDetectors: GetDetectors<S, C>): void {
        if (!isFunction(nextGetDetectors)) {
          throw new Error('Expect detectors to be an array.');
        }
        currentGetDetectors = nextGetDetectors;
      }

      function yarlDispatch<A extends Dispatchable<S, C>>(actions: A): Promise<void> {
        // normalise to array
        const actionsArr = isArray(actions) ? actions : [actions];
        const promises: Array<Promise<any>> = [];
        actionsArr.forEach(action => {
          if (action === null) {
            return;
          }
          if (isActionObject(action)) {
            store.dispatch(action);
            return;
          }
          if (isPromise(action)) {
            const actionProm = action.then(nextActions => {
              yarlDispatch(nextActions);
            });
            promises.push(actionProm);
            return;
          }
          if (isActionThunk<S, C>(action)) {
            const subActions = action(store.getState(), container);
            const subProm = yarlDispatch(subActions);
            promises.push(subProm);
            return;
          }
          console.warn('Invalid action !', action);
          return;
        });
        return Promise.all(promises).then(() => {
          return;
        });
      }

      store.subscribe(() => {
        if (detectorRunning === false) {
          detectorRunning = true;
          runDetector(currentGetDetectors(), yarlDispatch, store.getState, container);
          detectorRunning = false;
        }
      });

      const yarlStore: ReduxYarlStore<S, C> = {
        ...otherStoreMethods,
        replaceDetectors,
        dispatch: yarlDispatch,
      };

      return yarlStore;
    };
  };
}
