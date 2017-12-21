import * as React from 'react';
import { createPureComponent } from 'module/Common';
import { connect } from 'react-redux';
import { State } from 'module/Redux';

import { DispatchCompat } from 'lib/redux-yarl';
import { WindowSizeProvider } from 'module/View/Common';
import { CounterSelector, CounterAction } from 'module/Redux/Counter';

type StateProps = {
  counter: number | undefined;
};

const mapStateToProps = (s: State): StateProps => ({
  counter: CounterSelector.select(s),
});

type DispatchProps = {
  increment: () => void;
  decrement: () => void;
};

const mapDispatchToProps = (dispatch: DispatchCompat): DispatchProps => ({
  increment: () => dispatch(CounterAction.increment),
  decrement: () => dispatch(CounterAction.decrement),
});

type Props = StateProps & DispatchProps;

const MainLayoutComp = createPureComponent<Props>('MainLayout', ({ counter, increment, decrement }) => {
  return (
    <WindowSizeProvider>
      {({ width, height }) => {
        return (
          <div>
            <span>{counter}</span>
            <button onClick={() => increment()}>+</button>
            <button onClick={() => decrement()}>-</button>
          </div>
        );
      }}
    </WindowSizeProvider>
  );
});

export const MainLayout = connect(mapStateToProps, mapDispatchToProps)(MainLayoutComp);
