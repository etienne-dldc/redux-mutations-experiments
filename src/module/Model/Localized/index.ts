import { Record } from 'immutable';
import { nn, PathUtils } from 'module/Common';

export type Localized<T> = Record<Localized.Shape<T>>;

export namespace Localized {
  export interface Shape<T> {
    en: T | null;
    fr: T | null;
  }

  const defaultData: Shape<any> = {
    en: null,
    fr: null,
  };

  const Factory = Record<Shape<any>>(defaultData, 'Localized');

  export const create = <T>(fr: T, en: T): Localized<T> => new Factory({ fr, en });

  export const get = <T>(model: Localized<T>, lang: PathUtils.Lang): T => {
    return nn(model.get(lang, null));
  };
}
