import * as React from 'react';

type Props = {
  children?: any;
  renderError?: (error: Error, info: React.ErrorInfo | null) => JSX.Element;
  onError: (error: Error, info: React.ErrorInfo | null) => void;
};

type State = {
  error: Error | null;
  info: React.ErrorInfo | null;
};

export class CoreErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      info: null,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, info);
    }
    this.setState({ error, info });
  }

  render() {
    const { children, renderError = (err: Error, inf: React.ErrorInfo | null) => null } = this.props;
    const { error, info } = this.state;

    if (error !== null) {
      return renderError(error, info);
    }

    return children;
  }
}
