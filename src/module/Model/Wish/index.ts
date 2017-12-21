import { Record } from 'immutable';
import { nn } from 'module/Common';

export type Wish<T, W = any> = Record<Wish.Shape<T, W>>;

export namespace Wish {
  export enum Status {
    VOID = 'VOID',
    PENDING = 'PENDING',
    RESOLVED = 'RESOLVED',
    REJECTED = 'REJECTED',
  }

  const { RESOLVED, VOID, REJECTED, PENDING } = Status;

  export interface Shape<T, R = any> {
    status: Status;
    data: T | null;
    reason: R | null;
  }

  const defaultData: Shape<any> = {
    status: VOID,
    data: null,
    reason: null,
  };

  const Factory = Record<Shape<any>>(defaultData, 'Wish');

  const create = <D, R = any>(status: Status, data: D | null, reason: R | null): Wish<D, R> =>
    new Factory({ status, data, reason });

  export const createResolved = <D, R = any>(data: D | Wish<D, R>) => {
    if (isWish(data)) {
      return data;
    }
    return create<D, R>(RESOLVED, data, null);
  };
  export const createRejected = <D, R = any>(reason: R | null = null) => create<D, R>(REJECTED, null, reason);
  export const createPending = <D, R = any>(reason: R | null = null) => create<D, R>(PENDING, null, null);
  export const createVoid = <D, R = any>(reason: R | null = null) => create<D, R>(VOID, null, reason);

  export const isResolved = <D, R = any>(mod: Wish<D, R>): boolean => getStatus(mod) === RESOLVED;
  export const isVoid = <D, R = any>(mod: Wish<D, R>): boolean => getStatus(mod) === VOID;
  export const isRejected = <D, R = any>(mod: Wish<D, R>): boolean => getStatus(mod) === REJECTED;
  export const isPending = <D, R = any>(mod: Wish<D, R>): boolean => getStatus(mod) === PENDING;

  export const setResolved = <D, R = any>(model: Wish<D, R>, data: D): Wish<D, R> =>
    model.merge({
      status: RESOLVED,
      data,
      reason: null,
    });
  export const setRejected = <D, R = any>(model: Wish<D, R>, error: any): Wish<D, R> =>
    model.merge({
      status: REJECTED,
      data: null,
      reason: error,
    });
  export const setPending = <D, R = any>(model: Wish<D, R>, reason?: any): Wish<D, R> =>
    model.merge({
      status: PENDING,
      data: null,
      reason: reason === undefined ? getReasonOrNull(model) : reason,
    });

  export const combineStatus = (...statusList: Array<Status>): Status =>
    statusList.reduce((acc, status, index, list) => {
      if (acc === REJECTED || status === REJECTED) {
        return REJECTED;
      }
      if (acc === PENDING || status === PENDING) {
        return PENDING;
      }
      if (acc === VOID || status === VOID) {
        return VOID;
      }
      return RESOLVED;
    });

  export const getReasonOrNull = <D, R = any>(model: Wish<D, R>): any | null => model.get('reason', null);
  export const getDataOrNull = <D, R = any>(model: Wish<D, R>): D | null => model.get('data', null);
  export const getDataOrValue = <D, V = D, R = any>(model: Wish<D, R>, value: V): D | V =>
    isResolved(model) ? getDataOrThrow(model) : value;
  export const getDataTransformedOrNull = <D, Out, R = any>(
    model: Wish<D, R>,
    transformer: (data: D) => Out
  ): Out | null => (isResolved(model) ? transformer(getDataOrThrow(model)) : null);
  export const getDataOrThrow = <D, R = any>(model: Wish<D, R>): D => nn(model.get('data', null));
  export const getStatus = <D, R = any>(model: Wish<D, R>): Status => model.get('status', VOID);

  export function combine<D1, W1, D2, W2, DOut>(
    wishes: [Wish<D1, W1>, Wish<D2, W2>],
    mergeData: (d1: D1, d2: D2) => DOut | Wish<DOut>
  ): Wish<DOut, [W1, W2]>;
  export function combine<D1, W1, D2, W2, D3, W3, DOut>(
    wishes: [Wish<D1, W1>, Wish<D2, W2>, Wish<D3, W3>],
    mergeData: (d1: D1, d2: D2, d3: D3) => DOut | Wish<DOut>
  ): Wish<DOut, [W1, W2, W3]>;
  export function combine<D1, W1, D2, W2, D3, W3, D4, W4, DOut>(
    wishes: [Wish<D1, W1>, Wish<D2, W2>, Wish<D3, W3>, Wish<D4, W4>],
    mergeData: (d1: D1, d2: D2, d3: D3, d4: D4) => DOut | Wish<DOut>
  ): Wish<DOut, [W1, W2, W3, W4]>;
  export function combine<D1, W1, D2, W2, D3, W3, D4, W4, D5, W5, DOut>(
    wishes: [Wish<D1, W1>, Wish<D2, W2>, Wish<D3, W3>, Wish<D4, W4>, Wish<D5, W5>],
    mergeData: (d1: D1, d2: D2, d3: D3, d4: D4, d5: D5) => DOut | Wish<DOut>
  ): Wish<DOut, [W1, W2, W3, W4, W5]>;
  export function combine<D, W, DOut>(
    wishes: Array<Wish<D, W>>,
    mergeData: (...d: Array<D>) => DOut | Wish<DOut>
  ): Wish<DOut, Array<W>> {
    const statusList = wishes.map(wish => getStatus(wish));
    const combinedStatus = combineStatus(...statusList);
    if (combinedStatus === RESOLVED) {
      return createResolved(mergeData(...wishes.map(wish => getDataOrThrow(wish))));
    }
    const reasons: Array<W> = wishes.map(wish => getReasonOrNull(wish));
    if (combinedStatus === REJECTED) {
      return createRejected(reasons);
    }
    if (combinedStatus === PENDING) {
      return createPending(reasons);
    }
    return createVoid<DOut>(reasons);
  }

  export const transform = <D, R, DOut, ROut>(
    wish: Wish<D, R>,
    transformer: (d: D) => DOut | Wish<DOut, ROut>
  ): Wish<DOut, ROut> => {
    const status = getStatus(wish);
    if (status === RESOLVED) {
      const out = transformer(getDataOrThrow(wish));
      return createResolved(out);
    }
    const reason: ROut = getReasonOrNull(wish);
    if (status === REJECTED) {
      return createRejected<DOut, ROut>(reason);
    }
    if (status === PENDING) {
      return createPending(reason);
    }
    return createVoid<DOut>(reason);
  };

  export const transformReason = <D, W, WOut>(wish: Wish<D, W>, transformer: (w: W) => WOut): Wish<D, WOut> => {
    const status = getStatus(wish);
    if (status === RESOLVED) {
      return wish as any;
    }
    const reason: WOut = transformer(getReasonOrNull(wish));
    if (status === REJECTED) {
      return createRejected(reason);
    }
    if (status === PENDING) {
      return createPending(reason);
    }
    return createVoid<D, WOut>(reason);
  };

  export const isWish = <D>(maybeWish: any): maybeWish is Wish<D> => {
    return maybeWish instanceof Factory;
  };

  // If it's Wish<Wish<D>> && outer wish is resolved return the internal Wish
  export const flatten = <D, W = any, WIn = any>(wish: Wish<D | Wish<D, WIn>, W>): Wish<D, W | WIn> => {
    if (isResolved(wish) && isWish(getDataOrNull(wish))) {
      const subWish: Wish<D> = getDataOrThrow(wish) as any;
      return subWish;
    }
    return wish as Wish<D, W>;
  };

  type ExtractMap<D, R, W> = {
    VOID?: (reason: W | null) => R;
    RESOLVED?: (data: D, reason: W | null) => R;
    REJECTED?: (reason: W | null) => R;
    PENDING?: (reason: W | null) => R;
  };

  export const extract = <D, R, W = any>(wish: Wish<D, W>, extractMap: ExtractMap<D, R, W>, defaultResult: R): R => {
    const status = getStatus(wish);
    const reason = getReasonOrNull(wish);
    if (status === RESOLVED) {
      return extractMap.RESOLVED ? extractMap.RESOLVED(getDataOrThrow(wish), reason) : defaultResult;
    }
    if (status === REJECTED) {
      return extractMap.REJECTED ? extractMap.REJECTED(getReasonOrNull(wish)) : defaultResult;
    }
    if (status === PENDING) {
      return extractMap.PENDING ? extractMap.PENDING(reason) : defaultResult;
    }
    return extractMap.VOID ? extractMap.VOID(reason) : defaultResult;
  };
}
