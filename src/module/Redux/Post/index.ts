import { combineReducers } from 'lib/misc';
import { postEntity } from './postEntity';
import { WishCollection } from 'module/Model/WishCollection';
import { Post } from 'module/Model/Post';

export type PostKey = number;

export { PostAction } from './PostAction';
export { PostSelector } from './PostSelector';

export type State = {
  post: WishCollection<PostKey, Post>;
};

export const reducer = combineReducers<State>({
  post: postEntity.reducer,
});
