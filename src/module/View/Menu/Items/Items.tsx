import * as React from 'react';
import { List } from 'immutable';
import { createPureComponent } from 'module/Common';
import { MenuItems, MenuItem } from 'module/Model/Menu';
import { ItemCategories } from './ItemCategories';
import { ItemPageLink } from './ItemPageLink';
import { ItemPostLink } from './ItemPostLink';
import { MenuItemType } from 'module/Model/Menu/item/MenuItemType';

type Props = {
  items: MenuItems;
  categoryIds: List<number>;
};

export const Items = createPureComponent<Props>('Items', ({ items, categoryIds }) => {
  return (
    <div>
      {items
        .map((menuItem, index) => {
          switch (MenuItem.getType(menuItem)) {
            case MenuItemType.Categories:
              return <ItemCategories key={index} item={menuItem} categoryIds={categoryIds} />;
            case MenuItemType.PageLink:
              return <ItemPageLink key={index} item={menuItem as any} />;
            case MenuItemType.PostLink:
              return <ItemPostLink key={index} item={menuItem as any} />;
            default:
              return <div key={index}>Unknown menu item type.</div>;
          }
        })
        .toArray()}
    </div>
  );
});
