import * as React from 'react';
import { MainLayout } from 'module/View';
import { app } from './app';
import { CounterAction } from 'module/Redux/Counter';

app.dispatch(CounterAction.init);

app.boot({
  appComponent: <MainLayout />,
  element: document.getElementById('root'),
});
