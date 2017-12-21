import { Record } from 'immutable';
import { Content } from '../Content';
import { MzImage } from '../MzImage';
import { Title } from '../Title';
import { Mapper } from 'module/Common';

export type Post = Record<Post.Shape>;

export namespace Post {
  export type Shape = {
    id: number | null;
    date: Date | null;
    title: Title | null;
    content: Content | null;
    coverImg: MzImage | null;
    overviewImg: MzImage | null;
  };

  const defaultData: Shape = {
    id: null,
    date: null,
    title: null,
    content: null,
    coverImg: null,
    overviewImg: null,
  };

  const Factory = Record<Shape>(defaultData, 'Post');

  export const mapper = Mapper.schema(
    {
      id: Mapper.num,
      date: Mapper.date,
      title: Title.mapper,
      content: Content.mapper,
      cover_img: MzImage.mapper,
      overview_img: MzImage.mapper,
    },
    ({ id, date, title, content, cover_img, overview_img }) =>
      new Factory({ id, date, title, content, coverImg: cover_img, overviewImg: overview_img })
  );

  export const createFromApi = (input: any) => Mapper.exec(mapper, input);
}
