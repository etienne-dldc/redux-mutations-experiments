import { WishCollectionEntity, identityEntity } from 'module/Redux/Common';
import { Page } from 'module/Model/Page';
import { PageKey } from './index';

export const pageEntity = WishCollectionEntity.createEntity<PageKey, Page>()('Page', identityEntity);
