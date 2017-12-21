import { WishEntity, identityEntity } from 'module/Redux/Common';
import { PageList } from 'module/Model/PageList';

export const pageListEntity = WishEntity.createEntity<PageList>()('PageList', identityEntity);
