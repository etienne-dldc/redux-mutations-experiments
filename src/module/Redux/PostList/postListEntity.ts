import { PostList } from 'module/Model/PostList';
import { WishEntity, identityEntity } from 'module/Redux/Common';

export const postListEntity = WishEntity.createEntity<PostList>()('PostList', identityEntity);
