import { ContentItemType } from './ContentItemType';
import { Record } from 'immutable';
import { Mapper } from 'module/Common';
import { Localized } from 'module/Model/Localized';

export type ContentRichText = Record<ContentRichText.Shape>;

export namespace ContentRichText {
  export interface Shape {
    type: ContentItemType;
    text: Localized<string> | null;
  }

  const defaultData: Shape = {
    type: ContentItemType.RichText,
    text: null,
  };

  const Factory = Record<Shape>(defaultData, 'ContentRichText');

  export const mapper = Mapper.schema(
    {
      text_fr: Mapper.str,
      text_en: Mapper.str,
    },
    ({ text_fr, text_en }) => Factory({ text: Localized.create(text_fr, text_en) })
  );

  export const createFromApi = (input: any): ContentRichText => Mapper.exec(mapper, input);
}
