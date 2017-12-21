import { combineReducers } from 'lib/misc';
import { postListEntity } from './postListEntity';
import { Wish } from 'module/Model/Wish';
import { PostList } from 'module/Model/PostList';

export { PostListAction } from './PostListAction';
export { PostListSelector } from './PostListSelector';

export type State = {
  postList: Wish<PostList>;
};

export const reducer = combineReducers<State>({
  postList: postListEntity.reducer,
});
