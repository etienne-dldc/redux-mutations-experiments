import { combineReducers } from 'lib/misc';
import { pageListEntity } from './pageListEntity';
import { Wish } from 'module/Model/Wish';
import { PageList } from 'module/Model/PageList';

export { PageListAction } from './PageListAction';
export { PageListSelector } from './PageListSelector';

export type State = {
  pageList: Wish<PageList>;
};

export const reducer = combineReducers<State>({
  pageList: pageListEntity.reducer,
});
