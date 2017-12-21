import * as React from 'react';
import throttle from 'lodash/throttle';

type Params = {
  width: number;
  height: number;
};

type Props = {
  children: (params: Params) => React.ReactNode;
};

type State = {
  width: number;
  height: number;
};

export class WindowSizeProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.onResize = throttle(this.onResize.bind(this), 100);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    return this.props.children(this.state);
  }

  private onResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
}
