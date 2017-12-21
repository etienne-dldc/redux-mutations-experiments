import * as React from 'react';
import { connect } from 'react-redux';
import { DispatchCompat } from 'lib/redux-yarl';
import { MainAction } from 'module/Redux/Main';

type Params = boolean;

type DispatchProps = {
  setTouched: () => void;
};

const mapDispatchToProps = (dispatch: DispatchCompat): DispatchProps => ({
  setTouched: () => dispatch(MainAction.touched),
});

type OwnProps = {
  children: (params: Params) => React.ReactNode;
};

type Props = DispatchProps & OwnProps;

type State = {
  detected: boolean;
};

class TouchDetectComp extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      detected: false,
    };
    this.onTouch = this.onTouch.bind(this);
  }

  componentDidMount() {
    window.addEventListener('touchstart', this.onTouch);
  }

  componentWillUnmount() {
    window.removeEventListener('touchstart', this.onTouch);
  }

  render() {
    return this.props.children(this.state.detected);
  }

  private onTouch() {
    this.setState({ detected: true });
    this.props.setTouched();
    window.removeEventListener('touchstart', this.onTouch);
  }
}

export const TouchDetect = connect(null, mapDispatchToProps)(TouchDetectComp);
