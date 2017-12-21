import { combineReducers } from 'lib/misc';
import { categoriesEntity } from './categoriesEntity';
import { Wish } from 'module/Model/Wish';
import { Categories } from 'module/Model/Categories';

export { CategoriesAction } from './CategoriesAction';
export { CategoriesSelector } from './CategoriesSelector';

export type State = {
  categories: Wish<Categories>;
};

export const reducer = combineReducers<State>({
  categories: categoriesEntity.reducer,
});
