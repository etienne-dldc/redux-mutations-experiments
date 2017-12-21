import { MenuItemType } from './MenuItemType';
import { Record } from 'immutable';
import { Mapper, nn } from 'module/Common';
import { Localized } from 'module/Model/Localized';

export type MenuItemPostLink = Record<MenuItemPostLink.Shape>;

export namespace MenuItemPostLink {
  export interface Shape {
    type: MenuItemType;
    postId: number | null;
    title: Localized<string> | null;
  }

  const defaultData: Shape = {
    type: MenuItemType.PostLink,
    postId: null,
    title: null,
  };

  const Factory = Record<Shape>(defaultData, 'MenuItemPostLink');

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
      return Factory({ postId: data.lien.id, title });
    }
  );

  export const createFromApi = (input: any): MenuItemPostLink => Mapper.exec(mapper, input);

  export const getPostId = (model: MenuItemPostLink): number => nn(model.get('postId', null));
  export const getTitle = (model: MenuItemPostLink): Localized<string> => nn(model.get('title', null));
}
