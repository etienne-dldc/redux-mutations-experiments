import { Record } from 'immutable';
import { nn } from 'module/Common';

export type MzImageSize = Record<MzImageSize.Shape>;

export namespace MzImageSize {
  export interface Shape {
    url: string | null;
    width: number | null;
    height: number | null;
  }

  const defaultData: Shape = {
    url: null,
    width: null,
    height: null,
  };

  const Factory = Record<Shape>(defaultData, 'MzImageSize');

  export const create = (url: string, width: number, height: number): MzImageSize =>
    new Factory({ url, width, height });

  export const getUrl = (model: MzImageSize) => nn(model.get('url', null));
}
