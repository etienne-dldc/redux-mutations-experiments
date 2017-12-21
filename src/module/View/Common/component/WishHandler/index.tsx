import * as React from 'react';
import { Wish } from 'module/Model/Wish';
import isNumber from 'lodash/isNumber';

type Props<D> = {
  wish: Wish<D>;
  // on mount, if void consider loading for X milliseconds
  // This avoid flickering on first mount
  voidAsloadingOnMountDuration?: number | false;
  handleResolved?: (data: D) => JSX.Element;
  handlePending?: () => JSX.Element;
  handleRejected?: (error: any) => JSX.Element;
  handleVoid?: () => JSX.Element;
};

export class WishHandler extends React.Component<Props<any>> {
  static defaultProps: Partial<Props<any>> = {
    voidAsloadingOnMountDuration: 300,
  };

  static create<D>(data?: Wish<D>): React.ComponentClass<Props<D>> {
    return WishHandler;
  }

  private lastVoidStatusTime: number = 0;
  private timer: number | null = null;

  componentDidMount() {
    this.resetTimer();
  }

  componentWillReceiveProps(nextProps: Props<any>) {
    const prevStatus: Wish.Status = Wish.getStatus(this.props.wish);
    const nextStatus: Wish.Status = Wish.getStatus(nextProps.wish);
    if (nextStatus === Wish.Status.VOID && prevStatus !== nextStatus) {
      this.resetTimer();
    }
  }

  render() {
    const { VOID, PENDING, RESOLVED, REJECTED } = Wish.Status;
    const {
      wish,
      voidAsloadingOnMountDuration,
      handleVoid = () => null,
      handlePending = () => <div>Loading...</div>,
      handleRejected = (error: any) => <div>Error</div>,
      handleResolved = (data: any) => null,
    } = this.props;
    const status: Wish.Status = Wish.getStatus(wish);
    const voidAsLoading: boolean = isNumber(voidAsloadingOnMountDuration)
      ? Date.now() - this.lastVoidStatusTime > voidAsloadingOnMountDuration
      : false;
    if (status === PENDING || (voidAsLoading && status === VOID)) {
      return handlePending();
    }
    if (status === VOID) {
      return handleVoid();
    }
    if (status === REJECTED) {
      const error = Wish.getReasonOrNull(wish);
      return handleRejected(error);
    }
    if (status === RESOLVED) {
      return handleResolved(Wish.getDataOrThrow(wish));
    }
    return null;
  }

  private resetTimer(): void {
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
    }
    this.lastVoidStatusTime = Date.now();
    if (isNumber(this.props.voidAsloadingOnMountDuration)) {
      this.timer = window.setTimeout(() => {
        this.forceUpdate();
      }, this.props.voidAsloadingOnMountDuration);
    }
  }
}

export function createWishHandler<D>(): React.ComponentClass<Props<D>> {
  return WishHandler;
}
