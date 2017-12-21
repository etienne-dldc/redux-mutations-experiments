import { WishCollectionEntity, identityEntity } from 'module/Redux/Common';
import { Post } from 'module/Model/Post';
import { PostKey } from './index';

export const postEntity = WishCollectionEntity.createEntity<PostKey, Post>()('Post', identityEntity);
