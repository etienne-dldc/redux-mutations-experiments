import { WishEntity, identityEntity } from 'module/Redux/Common';
import { Menu } from 'module/Model/Menu';

export const menuEntity = WishEntity.createEntity<Menu>()('Menu', identityEntity);
