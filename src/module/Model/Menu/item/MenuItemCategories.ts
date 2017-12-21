import { MenuItemType } from './MenuItemType';
import { Record } from 'immutable';

export type MenuItemCategories = Record<MenuItemCategories.Shape>;

export namespace MenuItemCategories {
  export interface Shape {
    type: MenuItemType;
  }

  const defaultData: Shape = {
    type: MenuItemType.Categories,
  };

  const Factory = Record<Shape>(defaultData, 'MenuItemCategories');

  export const createFromApi = (input: any): MenuItemCategories => Factory();
}
