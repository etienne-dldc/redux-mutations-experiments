import { AppInvariantError } from '../error';
import isNil from 'lodash/isNil';

export namespace Invariant {
  export function notNull<T>(val: T | null): T {
    if (val === null) {
      throw new AppInvariantError(`Invariant: value should not be null`);
    }
    return val;
  }

  export function notNil<T>(val: T | null | undefined): T {
    if (isNil(val)) {
      throw new AppInvariantError(`Invariant: value should not be null | undefined`);
    }
    return val;
  }

  export function notUndefined<T>(val: T | undefined): T {
    if (val === undefined) {
      throw new AppInvariantError(`Invariant: value should not be undefined`);
    }
    return val;
  }
}

// Aliases
export const nn = Invariant.notNull;
export const nu = Invariant.notUndefined;
