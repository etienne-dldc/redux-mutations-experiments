import { Map } from 'immutable';
import { Mapper } from 'module/Common';
import { MzImageSizeType } from './MzImageSizeType';
import { MzImageSize } from './MzImageSize';

export type MzImageSizeMap = Map<MzImageSizeType, MzImageSize>;

export namespace MzImageSizeMap {
  export const createEmpty = () => Map<MzImageSizeType, MzImageSize>();

  export const mapper = Mapper.schema(
    {
      thumbnail: Mapper.str,
      'thumbnail-width': Mapper.num,
      'thumbnail-height': Mapper.num,
      medium: Mapper.str,
      'medium-width': Mapper.num,
      'medium-height': Mapper.num,
      medium_large: Mapper.str,
      'medium_large-width': Mapper.num,
      'medium_large-height': Mapper.num,
      large: Mapper.str,
      'large-width': Mapper.num,
      'large-height': Mapper.num,
    },
    input => {
      return Map<MzImageSizeType, MzImageSize>().withMutations(m =>
        m
          .set(
            MzImageSizeType.Thumbnail,
            MzImageSize.create(input.thumbnail, input['thumbnail-width'], input['thumbnail-height'])
          )
          .set(MzImageSizeType.Medium, MzImageSize.create(input.medium, input['medium-width'], input['medium-height']))
          .set(
            MzImageSizeType.MediumLarge,
            MzImageSize.create(input.medium_large, input['medium_large-width'], input['medium_large-height'])
          )
          .set(MzImageSizeType.Large, MzImageSize.create(input.large, input['large-width'], input['large-height']))
      );
    }
  );

  export const createFromApi = (input: any): MzImageSizeMap => {
    return Mapper.exec(mapper, input);
  };
}
