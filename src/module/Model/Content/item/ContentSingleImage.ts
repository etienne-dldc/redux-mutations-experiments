import { ContentItemType } from './ContentItemType';
import { Record } from 'immutable';
import { MzImage } from '../../MzImage';
import { Mapper } from 'module/Common';

export type ContentSingleImage = Record<ContentSingleImage.Shape>;

export namespace ContentSingleImage {
  export interface Shape {
    type: ContentItemType;
    source: MzImage | null;
    fullWidth: boolean;
  }

  const defaultData: Shape = {
    type: ContentItemType.SingleImage,
    source: null,
    fullWidth: false,
  };

  const Factory = Record<Shape>(defaultData, 'ContentSingleImage');

  export const mapper = Mapper.schema(
    {
      source: MzImage.mapper,
      full_width: Mapper.bool,
    },
    ({ source, full_width }) => Factory({ source, fullWidth: full_width })
  );

  export const createFromApi = (input: any): ContentSingleImage => Mapper.exec(mapper, input);
}
