import * as React from 'react';

export function createPureComponent<P>(name: string, pureRender: React.SFC<P>) {
  class Pure extends React.PureComponent<P> {
    render() {
      return pureRender(this.props);
    }
  }
  Object.defineProperty(Pure, 'name', { value: name });
  return Pure;
}
