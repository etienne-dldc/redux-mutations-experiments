import { List } from 'immutable';
import { Mapper } from 'module/Common';
import { PageListItem } from './PageListItem';

export { PageListItem } from './PageListItem';
export type PageList = List<PageListItem>;

export namespace PageList {
  export const mapper = Mapper.immutableList(PageListItem.mapper);

  export const createFromApi = (input: any) => Mapper.exec(mapper, input);
}
