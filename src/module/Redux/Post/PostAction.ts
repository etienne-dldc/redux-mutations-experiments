import { postEntity } from './postEntity';
import { Dispatchable } from '../index';
import { MelezeApi } from 'module/Service/MelezeApi';
import { PostKey } from './index';

export namespace PostAction {
  export const fetchPost = (key: PostKey): Dispatchable => [
    postEntity.actionCreators.byKeyAction(res => ({ key, resourceAction: res.pending(null) })),
    MelezeApi.getPost(key)
      .then(post => postEntity.actionCreators.byKeyAction(res => ({ key, resourceAction: res.resolved(post) })))
      .catch(e => postEntity.actionCreators.byKeyAction(res => ({ key, resourceAction: res.rejected(e) }))),
  ];
}
