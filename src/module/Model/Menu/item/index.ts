import { MenuItemCategories } from './MenuItemCategories';
import { MenuItemPageLink } from './MenuItemPageLink';
import { MenuItemPostLink } from './MenuItemPostLink';
import { MenuItemType } from 'module/Model/Menu/item/MenuItemType';
import { nn } from 'module/Common';

export { MenuItemCategories } from './MenuItemCategories';
export { MenuItemPageLink } from './MenuItemPageLink';
export { MenuItemPostLink } from './MenuItemPostLink';

export type MenuItem = MenuItemCategories | MenuItemPageLink | MenuItemPostLink;

export namespace MenuItem {
  export const getType = (model: MenuItem): MenuItemType => nn(model.get('type', null));
}
