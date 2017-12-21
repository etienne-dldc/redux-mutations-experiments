import { Record } from 'immutable';
import { Content } from '../Content';
import { MzImage } from '../MzImage';
import { Title } from '../Title';
import { Mapper } from 'module/Common';

export type Page = Record<Page.Shape>;

export namespace Page {
  export type Shape = {
    id: number | null;
    date: Date | null;
    slug: string | null;
    title: Title | null;
    content: Content | null;
    coverImg: MzImage | null;
    overviewImg: MzImage | null;
  };

  const defaultData: Shape = {
    id: null,
    date: null,
    slug: null,
    title: null,
    content: null,
    coverImg: null,
    overviewImg: null,
  };

  const Factory = Record<Shape>(defaultData, 'Page');

  export const mapper = Mapper.schema(
    {
      id: Mapper.num,
      date: Mapper.date,
      slug: Mapper.str,
      title: Title.mapper,
      content: Content.mapper,
      cover_img: MzImage.mapper,
    },
    ({ id, date, slug, title, content, cover_img }) =>
      new Factory({ id, date, slug, title, content, coverImg: cover_img })
  );

  export const createFromApi = (input: any) => Mapper.exec(mapper, input);
}
