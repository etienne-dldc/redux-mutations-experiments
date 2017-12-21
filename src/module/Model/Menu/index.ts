import { Record, List } from 'immutable';
import { Mapper, nn } from 'module/Common';
import { MenuItem, MenuItemCategories, MenuItemPageLink, MenuItemPostLink } from './item';
import isPlainObject from 'lodash/isPlainObject';
import { MenuItemType } from './item/MenuItemType';

export { MenuItem, MenuItemCategories, MenuItemPageLink, MenuItemPostLink } from './item';

export type MenuItems = List<MenuItem>;

export type Menu = Record<Menu.Shape>;

export namespace Menu {
  export type Shape = {
    categories: List<number>;
    items: MenuItems;
  };

  const defaultData: Shape = {
    categories: List<number>(),
    items: List<MenuItem>(),
  };

  const Factory = Record<Shape>(defaultData, 'Menu');

  const itemMapper: Mapper<MenuItem> = (input: any, path: Array<string>): MenuItem => {
    if (!isPlainObject(input)) {
      throw new Mapper.MapperError(path, input, 'Should be an object');
    }
    const type = Mapper.exec(Mapper.stringEnum<MenuItemType>(MenuItemType), input.acf_fc_layout);
    switch (type) {
      case MenuItemType.Categories:
        return MenuItemCategories.createFromApi(input);
      case MenuItemType.PageLink:
        return MenuItemPageLink.createFromApi(input);
      case MenuItemType.PostLink:
        return MenuItemPostLink.createFromApi(input);
      default:
        throw new Error(`Unhandled menu item type ${type}`);
    }
  };

  export const mapper = Mapper.schema(
    {
      menu_categories: Mapper.immutableList(Mapper.num),
      menu_items: Mapper.immutableList(itemMapper),
    },
    ({ menu_categories, menu_items }) => new Factory({ categories: menu_categories, items: menu_items })
  );

  export const createFromApi = (input: any) => Mapper.exec(mapper, input);

  export const getItems = (model: Menu): MenuItems => nn(model.get('items', null));
  export const getCategories = (model: Menu): List<number> => nn(model.get('categories', null));
}
