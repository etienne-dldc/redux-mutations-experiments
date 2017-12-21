import * as React from 'react';
import { createPureComponent } from 'module/Common';
import { connect } from 'react-redux';
import { CoreState } from 'module/Core';

import { DispatchCompat } from 'lib/redux-yarl';
import { WindowSizeProvider } from 'module/View/Common';

type StateProps = {};

const mapStateToProps = (s: CoreState): StateProps => ({});

type DispatchProps = {};

const mapDispatchToProps = (dispatch: DispatchCompat): DispatchProps => ({});

type Props = StateProps & DispatchProps;

const MainLayoutComp = createPureComponent<Props>('MainLayout', () => {
  return (
    <WindowSizeProvider>
      {({ width, height }) => {
        return <div>Hello React</div>;
      }}
    </WindowSizeProvider>
  );
});

export const MainLayout = connect(mapStateToProps, mapDispatchToProps)(MainLayoutComp);
