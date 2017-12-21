import { Mapper } from 'module/Common';
import { Localized } from 'module/Model/Localized';

export type Title = Localized<string>;

export namespace Title {
  export const mapper = Mapper.schema(
    {
      title_fr: Mapper.str,
      title_en: Mapper.str,
    },
    ({ title_fr, title_en }) => Localized.create(title_fr, title_en)
  );
}
