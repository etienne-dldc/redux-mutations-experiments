import { Record } from 'immutable';
import { Mapper, nn } from 'module/Common';
import { Localized } from 'module/Model/Localized';

export type Category = Record<Category.Shape>;

export namespace Category {
  export type Shape = {
    id: number | null;
    count: number | null;
    name: Localized<string> | null;
    slug: string | null;
  };

  const defaultData: Shape = {
    id: null,
    count: null,
    name: null,
    slug: null,
  };

  const Factory = Record<Shape>(defaultData, 'Category');

  export const mapper = Mapper.schema(
    {
      id: Mapper.num,
      count: Mapper.num,
      name: Mapper.schema(
        {
          name_fr: Mapper.nullable(Mapper.str, ''),
          name_en: Mapper.nullable(Mapper.str, ''),
        },
        ({ name_fr, name_en }) => Localized.create(name_fr, name_en)
      ),
      slug: Mapper.str,
    },
    ({ id, count, name, slug }) => new Factory({ id, count, name, slug })
  );

  export const createFromApi = (input: any) => Mapper.exec(mapper, input);

  export const getId = (model: Category): number => nn(model.get('id', null));
  export const getName = (model: Category): Localized<string> => nn(model.get('name', null));
}
