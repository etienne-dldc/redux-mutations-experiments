import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  createReduxYarlEnhancer,
  ReduxYarlStore,
  GetDetectors,
  Detectors,
  StoreEnhancerReduxYarlStoreCreator,
} from 'lib/redux-yarl';
import { reduceReducers } from 'lib/misc';
import * as ReduxRouterLocation from '@etienne-dldc/redux-router-location';
import { compose, applyMiddleware, createStore, Reducer, GenericStoreEnhancer } from 'redux';
import { Root } from './component/Root';
import { reducer as coreReducer } from './redux';
import { browserHistory } from './container';
import { CoreDetectorError, CoreReducerError, CoreAlreadyBooted, CoreBasicError } from './error';
import concat from 'lodash/concat';
import values from 'lodash/values';

type BootOptions = {
  appComponent: React.ReactElement<any>;
  element: HTMLElement | null;
};

export class Core {
  private store: ReduxYarlStore<any, any>;
  private appComponent: React.ReactElement<any> | null = null;
  private reducers: { [key: string]: Reducer<any> } = {};
  private detectors: { [key: string]: GetDetectors<any, any> } = {};
  private onBootListener: Array<() => void> = [];
  private booted: boolean = false;
  private element: HTMLElement | null;

  constructor() {
    this.store = this.configureStore();
    this.updateRedux();
  }

  boot(options: BootOptions) {
    if (this.booted) {
      throw new CoreAlreadyBooted();
    }
    this.appComponent = options.appComponent;
    this.element = options.element;

    this.render();
    this.onBootListener.map(listener => listener());

    this.booted = true;
  }

  registerReducer(key: string, reducer: Reducer<any>): void {
    if (this.reducers[key] !== undefined) {
      console.warn(`Warning: overriding key "${key}" in reducers`);
    }
    let reducerError: boolean = false;
    this.reducers[key] = (state: any, action: any) => {
      if (reducerError) {
        return state;
      }
      try {
        return reducer(state, action);
      } catch (e) {
        reducerError = true;
        window.setTimeout(() => {
          this.handleCoreError(new CoreReducerError(e, key));
        });
        return state;
      }
    };
    this.updateRedux();
  }

  registerDetectors(key: string, detectors: Detectors<any, Core>): void {
    if (this.detectors[key] !== undefined) {
      console.warn(`Warning: overriding key "${key}" in detectors`);
    }
    let detectorError: boolean = false;
    this.detectors[key] = () => {
      if (detectorError) {
        return [];
      }
      return detectors.map((detector, index) => (state: any, container: any) => {
        try {
          return detector(state, container);
        } catch (e) {
          detectorError = true;
          window.setTimeout(() => {
            this.handleCoreError(new CoreDetectorError(e, key + ' - ' + index));
          });
          return null;
        }
      });
    };
    this.updateRedux();
  }

  dispatch(action: any): Promise<any> {
    return this.store.dispatch(action);
  }

  whenBoot(listener: () => void): void {
    if (this.booted) {
      listener();
      return;
    }
    this.onBootListener.push(listener);
  }

  private updateRedux(): void {
    this.store.replaceReducer(this.getRootReducer());
    this.store.replaceDetectors(this.getGetDetectors());
  }

  private getAppComponent(): React.ReactElement<any> {
    if (this.appComponent === null) {
      throw new CoreBasicError(`appComponent should not be null`);
    }
    return this.appComponent;
  }

  private render() {
    const appComponent = this.getAppComponent();
    ReactDOM.render(
      <Root store={this.store as any} app={this}>
        {appComponent}
      </Root>,
      this.element
    );
  }

  private getRootReducer(): Reducer<any> {
    const reducers = values(this.reducers);
    const rootReducer = reduceReducers(coreReducer, ...reducers);
    return rootReducer;
  }

  private getGetDetectors(): GetDetectors<any, Core> {
    return () => concat([], ...values(this.detectors).map(getDetect => getDetect()));
  }

  private killApp(): void {
    ReactDOM.render(<div />, this.element);
    this.store.replaceDetectors(() => []);
    this.store.replaceReducer(s => s);
  }

  private handleCoreError(error: any): void {
    this.killApp();
    throw error;
  }

  private storeEnhancer(next: StoreEnhancerReduxYarlStoreCreator<any, Core>): any {
    return (reducer: any, preloadedState: any): ReduxYarlStore<any, Core> => {
      const wrapreducer = (theReducer: any): Reducer<any> => {
        let reducerError: boolean = false;
        return (state, action) => {
          if (reducerError) {
            return state;
          }
          try {
            return theReducer(state, action);
          } catch (e) {
            // side effect in reducer, sorry ¯\_(ツ)_/¯
            reducerError = true;
            window.setTimeout(() => {
              this.handleCoreError(new CoreReducerError(e));
            });
            // return valid state;
            return state;
          }
        };
      };
      const store = next(wrapreducer(reducer), preloadedState);
      const dispatch = (action: any): any => {
        return store.dispatch(action).catch(err => {
          console.warn('Unhandle error in action ! You should add catch when you dispatch Promise !');
          this.handleCoreError(err);
          return action;
        });
      };
      return {
        ...store,
        replaceReducer: (newReducer: Reducer<any>) => {
          store.replaceReducer(wrapreducer(newReducer));
        },
        dispatch,
      };
    };
  }

  private configureStore(): ReduxYarlStore<any, Core> {
    const enhancers: Array<any> = [];

    const devToolOptions = {
      latency: 0,
    };

    const devTools: any = process.env.NODE_ENV
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION__(devToolOptions)
        : null
      : null;

    const identityGetDetectors: GetDetectors<any, Core> = () => [];
    const reduxYarlStoreEnhancer = createReduxYarlEnhancer(identityGetDetectors, this);

    enhancers.push(
      this.storeEnhancer.bind(this),
      reduxYarlStoreEnhancer,
      ReduxRouterLocation.createEnhancer(browserHistory),
      applyMiddleware(ReduxRouterLocation.createMiddleware(browserHistory)),
      devTools
    );

    // compose final middleware
    const enhancer: GenericStoreEnhancer = (compose as (...args: Array<any>) => any)(
      ...enhancers.filter(enhan => enhan !== null)
    );

    const identityReducer: Reducer<any> = s => s;
    const store: ReduxYarlStore<any, Core> = createStore(identityReducer, enhancer) as any;

    return store;
  }
}
