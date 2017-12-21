import { List } from 'immutable';
import { ContentItem, ContentRichText, ContentSingleImage } from './item';
import { ContentItemType } from './item/ContentItemType';
import { Mapper } from 'module/Common';
import isPlainObject from 'lodash/isPlainObject';

export type Content = List<ContentItem>;

export namespace Content {
  const contentMapper: Mapper<ContentItem> = (input: any, path: Array<string>): ContentItem => {
    if (!isPlainObject(input)) {
      throw new Mapper.MapperError(path, input, 'Should be an object');
    }
    const type = Mapper.exec(Mapper.stringEnum<ContentItemType>(ContentItemType), input.acf_fc_layout);
    switch (type) {
      case ContentItemType.RichText:
        return ContentRichText.createFromApi(input);
      case ContentItemType.SingleImage:
        return ContentSingleImage.createFromApi(input);
      default:
        throw new Error(`Unhandled content type ${type}`);
    }
  };

  export const mapper = Mapper.immutableListOrEmptyIfNull(contentMapper);

  export const createFromApi = (input: any) => Mapper.exec(mapper, input);
}
