import { MenuItemType } from './MenuItemType';
import { Record } from 'immutable';
import { Mapper, nn } from 'module/Common';
import { Localized } from 'module/Model/Localized';

export type MenuItemPageLink = Record<MenuItemPageLink.Shape>;

export namespace MenuItemPageLink {
  export interface Shape {
    type: MenuItemType;
    pageId: number | null;
    title: Localized<string> | null;
  }

  const defaultData: Shape = {
    type: MenuItemType.PageLink,
    pageId: null,
    title: null,
  };

  const Factory = Record<Shape>(defaultData, 'MenuItemPageLink');

  const mapper = Mapper.schema(
    {
      lien: Mapper.schema(
        {
          id: Mapper.num,
          title: Mapper.schema(
            {
              title_fr: Mapper.str,
              title_en: Mapper.str,
            },
            v => v
          ),
        },
        v => v
      ),
      rename: Mapper.schema(
        {
          rename: Mapper.bool,
          name_fr: Mapper.str,
          name_en: Mapper.str,
        },
        v => v
      ),
    },
    data => {
      const title = data.rename.rename
        ? Localized.create(data.rename.name_fr, data.rename.name_en)
        : Localized.create(data.lien.title.title_fr, data.lien.title.title_en);
      return Factory({ pageId: data.lien.id, title });
    }
  );

  export const createFromApi = (input: any): MenuItemPageLink => Mapper.exec(mapper, input);

  export const getPageId = (model: MenuItemPageLink): number => nn(model.get('pageId', null));

  export const getTitle = (model: MenuItemPageLink): Localized<string> => nn(model.get('title', null));
}
