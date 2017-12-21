import { Record, List } from 'immutable';
import { MzImage } from '../MzImage';
import { Mapper, nn } from 'module/Common';
import { Title } from '../Title';
import { MzImageSizeType } from 'module/Model/MzImage/MzImageSizeType';
import { MzImageSize } from 'module/Model/MzImage/MzImageSize';

/**
 * PostListItem
 */

export type PostListItem = Record<PostListItem.Shape>;

export namespace PostListItem {
  export type Shape = {
    id: number | null;
    date: Date | null;
    title: Title | null;
    categories: List<number>;
    coverImg: MzImage | null;
    overviewImg: MzImage | null;
  };

  const defaultData: Shape = {
    id: null,
    date: null,
    title: null,
    categories: List(),
    coverImg: null,
    overviewImg: null,
  };

  const Factory = Record<Shape>(defaultData, 'PostListItem');

  export const mapper = Mapper.schema(
    {
      id: Mapper.num,
      date: Mapper.date,
      title: Title.mapper,
      categories: Mapper.immutableListOrEmptyIfNull(Mapper.num),
      cover_img: MzImage.mapper,
      overview_img: MzImage.mapper,
    },
    ({ id, date, title, cover_img, overview_img, categories }) =>
      new Factory({ id, date, title, coverImg: cover_img, overviewImg: overview_img, categories })
  );

  export const createFromApi = (input: any) => Mapper.exec(mapper, input);

  export const getId = (model: PostListItem): number => nn(model.get('id', null));
  export const getTitle = (model: PostListItem): Title => nn(model.get('title', null));
  export const getCategoriesId = (model: PostListItem): List<number> => nn(model.get('categories', null));
  export const hasCategoryId = (model: PostListItem, catId: number): boolean => getCategoriesId(model).contains(catId);
  export const getCover = (model: PostListItem): MzImage => nn(model.get('coverImg', null));
  export const getCoverRatio = (model: PostListItem): number => MzImage.getRatio(getCover(model));

  export const getCoverSize = (model: PostListItem, size: MzImageSizeType): MzImageSize =>
    nn(MzImage.getSizes(getCover(model)).get(size, null));
  export const getCoverSrc = (model: PostListItem, size: MzImageSizeType): string =>
    MzImageSize.getUrl(getCoverSize(model, size));
}
