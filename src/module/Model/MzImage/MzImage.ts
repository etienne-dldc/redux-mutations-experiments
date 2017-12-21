import { Record } from 'immutable';
import { Mapper, nn } from 'module/Common';
import { MzImageSizeMap } from './MzImageSizeMap';

export type MzImage = Record<MzImage.Shape>;

export namespace MzImage {
  export interface Shape {
    id: number | null;
    title: string | null;
    alt: string;
    width: number | null;
    height: number | null;
    sizes: MzImageSizeMap;
  }

  const defaultData: Shape = {
    id: null,
    title: null,
    alt: '',
    width: null,
    height: null,
    sizes: MzImageSizeMap.createEmpty(),
  };

  const Factory = Record<Shape>(defaultData, 'MzImage');

  export const mapper = Mapper.schema(
    {
      id: Mapper.num,
      title: Mapper.str,
      alt: Mapper.str,
      width: Mapper.num,
      height: Mapper.num,
      sizes: MzImageSizeMap.mapper,
    },
    ({ id, title, alt, width, height, sizes }) => new Factory({ id, title, alt, width, height, sizes })
  );

  export const createFromApi = (input: any): MzImage => Mapper.exec(mapper, input);

  export const getSizes = (model: MzImage): MzImageSizeMap => nn(model.get('sizes', null));
  export const getWidth = (model: MzImage): number => nn(model.get('width', null));
  export const getHeight = (model: MzImage): number => nn(model.get('height', null));
  export const getRatio = (model: MzImage): number => getWidth(model) / getHeight(model);
}
