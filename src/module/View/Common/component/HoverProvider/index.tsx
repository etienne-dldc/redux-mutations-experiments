import * as React from 'react';

type Params = {
  hover: boolean;
  ref: (el: HTMLElement) => void;
};

type Props = {
  children: (params: Params) => React.ReactNode;
};

type State = {
  hover: boolean;
};

export class HoverProvider extends React.PureComponent<Props, State> {
  private el: HTMLElement | null = null;
  private registered: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.registerTarget = this.registerTarget.bind(this);
  }

  componentDidMount() {
    this.register();
  }

  componentWillUnmount() {
    if (this.el) {
      this.el.removeEventListener('mouseenter', this.onEnter);
      this.el.removeEventListener('mouseleave', this.onLeave);
    }
  }

  render() {
    return this.props.children({
      hover: this.state.hover,
      ref: this.registerTarget,
    });
  }

  private register() {
    if (this.registered === false && this.el) {
      this.el.addEventListener('mouseenter', this.onEnter);
      this.el.addEventListener('mouseleave', this.onLeave);
    }
  }

  private registerTarget(el: HTMLElement) {
    this.el = el;
  }

  private onEnter() {
    this.setState({ hover: true });
  }

  private onLeave() {
    this.setState({ hover: false });
  }
}
