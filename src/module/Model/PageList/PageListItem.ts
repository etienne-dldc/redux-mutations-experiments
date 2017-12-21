import { Record, List } from 'immutable';
import { MzImage } from '../MzImage';
import { Mapper } from 'module/Common';
import { Title } from '../Title';

export type PageListItem = Record<PageListItem.Shape>;

export namespace PageListItem {
  export type Shape = {
    id: number | null;
    date: Date | null;
    title: Title | null;
    categories: List<number>;
    coverImg: MzImage | null;
  };

  const defaultData: Shape = {
    id: null,
    date: null,
    title: null,
    categories: List<number>(),
    coverImg: null,
  };

  const Factory = Record<Shape>(defaultData, 'PageListItem');

  export const mapper = Mapper.schema(
    {
      id: Mapper.num,
      date: Mapper.date,
      categories: Mapper.immutableListOrEmptyIfNull(Mapper.num),
      title: Title.mapper,
      cover_img: MzImage.mapper,
    },
    ({ id, date, title, categories, cover_img }) => new Factory({ id, date, title, categories, coverImg: cover_img })
  );

  export const createFromApi = (input: any) => Mapper.exec(mapper, input);
}
