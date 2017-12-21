import { WishEntity, identityEntity } from 'module/Redux/Common';
import { Categories } from 'module/Model/Categories';

export const categoriesEntity = WishEntity.createEntity<Categories>()('Categories', identityEntity);
