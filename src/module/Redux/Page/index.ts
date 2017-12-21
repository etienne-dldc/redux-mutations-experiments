import { combineReducers } from 'lib/misc';
import { pageEntity } from './pageEntity';
import { WishCollection } from 'module/Model/WishCollection';
import { Page } from 'module/Model/Page';

export type PageKey = number;

export { PageAction } from './PageAction';
export { PageSelector } from './PageSelector';

export type State = {
  page: WishCollection<PageKey, Page>;
};

export const reducer = combineReducers<State>({
  page: pageEntity.reducer,
});
