import { postListEntity } from './postListEntity';
import { Dispatchable } from '../index';
import { MelezeApi } from 'module/Service/MelezeApi';

export namespace PostListAction {
  export const fetchPostList = (): Dispatchable => [
    postListEntity.actionCreators.pending(null),
    MelezeApi.getPostList()
      .then(postList => postListEntity.actionCreators.resolved(postList))
      .catch(e => postListEntity.actionCreators.rejected(e)),
  ];
}
