import { List, Map } from 'immutable';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isNil from 'lodash/isNil';
import isBoolean from 'lodash/isBoolean';
import isPlainObject from 'lodash/isPlainObject';
import mapValues from 'lodash/mapValues';
import isArray from 'lodash/isArray';
import { parse } from 'date-fns';

export type Mapper<O> = (input: any, path: Array<string>) => O;

export namespace Mapper {
  export class MapperError extends Error {
    constructor(public path: Array<string>, value: any, msg: string, public subError?: Error) {
      super(
        `[MAPPER_INVARIANT]: In ${path.join('/')} : ${msg} got ${
          value
          // value && value.toString ? 'nil' : value.toString()
        }(${typeof value})`
      );
      console.warn(path, value, msg);
      Object.setPrototypeOf(this, MapperError.prototype);
    }
  }

  export function log<T>(innerMapper: Mapper<T>): Mapper<T> {
    return (input, path) => {
      console.info(input);
      return innerMapper(input, path);
    };
  }

  export function nullable<T>(innerMapper: Mapper<T>, defaultVal: T | null = null): Mapper<T | null> {
    return (input, path) => {
      if (input === null) {
        return defaultVal;
      }
      return innerMapper(input, path);
    };
  }

  export function empty<T>(innerMapper: Mapper<T>): Mapper<T | null> {
    return (input, path) => {
      if (isEmpty(input)) {
        return null;
      }
      return innerMapper(input, path);
    };
  }

  export const str: Mapper<string> = (input, path): string => {
    if (!isString(input)) {
      throw new MapperError(path, input, 'Expected a string');
    }
    return input;
  };

  export const date: Mapper<Date> = (input, path): Date => {
    try {
      return parse(input);
    } catch (e) {
      throw new MapperError(path, input, 'Expected a data: ' + e.toString());
    }
  };

  export const num: Mapper<number> = (input, path): number => {
    if (!isNumber(input)) {
      throw new MapperError(path, input, 'Expected a number');
    }
    return input;
  };

  export const stringInt: Mapper<number> = (input, path): number => {
    const parsed = parseInt(input, 10);
    if (isNaN(parsed)) {
      throw new MapperError(path, input, `Expected a string int, can't convert ${input} to int`);
    }
    return parsed;
  };

  export const anyNotUndefined: Mapper<any> = (input, path): string => {
    if (input === undefined) {
      throw new MapperError(path, input, `Expected a non undefined value !`);
    }
    return input;
  };

  export function numericEnum<T extends object>(theEnum: T): Mapper<T> {
    return (input, path): T => {
      if (!isNumber(input)) {
        throw new MapperError(path, input, 'Expected a number as numeric enum');
      }
      if (isNil(theEnum[input])) {
        throw new MapperError(path, input, 'Out of range numeric enum');
      }
      return input as any;
    };
  }

  export function stringEnum<T>(theEnum: any): Mapper<T> {
    return (input, path): T => {
      if (!isString(input)) {
        throw new MapperError(path, input, 'Expected a string as string enum');
      }
      const enumKey = Object.keys(theEnum).find(k => theEnum[k] === input);
      if (isNil(enumKey)) {
        throw new MapperError(path, input, 'Out of range string enum');
      }
      return input as any;
    };
  }

  export const bool: Mapper<boolean> = (input, path): boolean => {
    if (!isBoolean(input)) {
      throw new MapperError(path, input, 'Expected a boolean');
    }
    return input;
  };

  export const plainObjectAdvanced = <K extends string, V>(
    keyMapper: Mapper<K>,
    propMapperCreator: (value: V, key: K) => Mapper<V>
  ): Mapper<{ [L in K]: V }> => (input, path) => {
    return Object.keys(input).reduce<{ [L in K]: V }>(
      (acc, key) => {
        const subPath = [...path, key];
        const keyMapped = keyMapper(key, subPath);
        const propsMapper = propMapperCreator(input[key], keyMapped);
        acc[keyMapped] = propsMapper(input[key], subPath);
        return acc;
      },
      {} as any
    );
  };

  export const plainObject = <K extends string, V>(
    keyMapper: Mapper<K>,
    propMapper: Mapper<V>
  ): Mapper<{ [L in K]: V }> => (input, path) => {
    return plainObjectAdvanced<K, V>(keyMapper, () => propMapper)(input, path);
  };

  export const maybeUndefined = <V, U>(definedMappper: Mapper<V>, undefinedValue: U): Mapper<V | U> => (
    input,
    path
  ) => {
    if (input === undefined) {
      return undefinedValue;
    }
    return definedMappper(input, path);
  };

  export const immutableMap = <K, V>(keyMapper: Mapper<K>, propMapper: Mapper<V>): Mapper<Map<K, V>> => (
    input,
    path
  ) => {
    return Map<K, V>(
      Object.keys(input).reduce(
        (acc, key) => {
          const subPath = [...path, key];
          const keyMapped = keyMapper(key, subPath);
          acc[keyMapped] = propMapper(input[key], subPath);
          return acc;
        },
        {} as any
      )
    );
  };

  export const immutableMapOrEmpty = <K, V>(
    keyValidator: Mapper<K>,
    propValidator: Mapper<V>
  ): Mapper<Map<K, V> | null> => {
    return empty(immutableMap<K, V>(keyValidator, propValidator));
  };

  export const immutableListOrEmptyIfNull = <T>(itemMapper: Mapper<T>): Mapper<List<T>> => (
    input: any,
    path: Array<string>
  ): List<T> => {
    if (input === null) {
      return List<T>();
    }
    return immutableList<T>(itemMapper)(input, path);
  };

  export const immutableList = <T>(itemMapper: Mapper<T>): Mapper<List<T>> => (
    input: any,
    path: Array<string>
  ): List<T> => {
    if (!isArray(input)) {
      throw new MapperError(path, input, 'Expected an array');
    }
    return List<T>(
      input.map((item, index) => {
        return itemMapper(item, [...path, index.toString()]);
      })
    );
  };

  export const arrayOrEmptyIfNull = <T>(itemMapper: Mapper<T>): Mapper<Array<T>> => (
    input: any,
    path: Array<string>
  ): Array<T> => {
    if (input === null) {
      return [];
    }
    return array(itemMapper)(input, path);
  };

  export const array = <T>(itemMapper: Mapper<T>): Mapper<Array<T>> => (input: any, path: Array<string>): Array<T> => {
    if (!isArray(input)) {
      throw new MapperError(path, input, 'Expected an array');
    }
    return input.map((item, index) => {
      return itemMapper(item, [...path, index.toString()]);
    });
  };

  export const immutableListOrNull = <T>(itemMapper: Mapper<T>) => nullable<List<T>>(immutableList<T>(itemMapper));

  export function schema<Output, Outputs extends { [key: string]: any }>(
    keys: { [K in keyof Outputs]: Mapper<Outputs[K]> },
    creator: (values: { [K in keyof Outputs]: Outputs[K] }) => Output
  ): Mapper<Output> {
    return (input: any, path: Array<string> = []) => {
      if (!isPlainObject(input)) {
        throw new MapperError(path, input, 'Expected a plain object');
      }
      const values = mapValues(keys, (mapper, key) => {
        return mapper(input[key], [...path, key]);
      });
      return creator(values);
    };
  }

  export const create = <O>(schem: Mapper<O>) => (input: any) => schem(input, []);
  export const exec = <O>(schem: Mapper<O>, input: any): O => {
    try {
      return schem(input, []);
    } catch (e) {
      if (e instanceof MapperError) {
        console.info(`Info in ${e.path.join('/')}`);
      }
      throw e;
    }
  };
}
