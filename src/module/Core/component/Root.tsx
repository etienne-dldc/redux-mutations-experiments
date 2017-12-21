import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { CoreErrorBoundary } from './ErrorBundary';
import { Core } from '../Core';

type RootProps = {
  store: Store<any>;
  children: React.ReactChild;
  app: Core;
};

export const Root: React.SFC<RootProps> = ({ store, children, app }) => (
  <CoreErrorBoundary
    onError={error => {
      console.log('Do something with the error...');
      console.error(error);
    }}
  >
    <Provider store={store}>{React.Children.only(children)}</Provider>
  </CoreErrorBoundary>
);
