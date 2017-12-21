import { List } from 'immutable';
import { Mapper } from 'module/Common';
import { PostListItem } from './PostListItem';

export { PostListItem } from './PostListItem';
export type PostList = List<PostListItem>;

export namespace PostList {
  export const mapper = Mapper.immutableList(PostListItem.mapper);

  export const createFromApi = (input: any) => Mapper.exec(mapper, input);
}
