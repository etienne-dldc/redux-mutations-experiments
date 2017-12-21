import { State } from 'module/Redux';
import { RouterSelector } from 'module/Redux/Router';
import { RouteType } from 'module/Model/Routes';
import { createSelector } from 'reselect';
import { Category } from 'module/Model/Categories';
import { Wish } from 'module/Model/Wish';

export namespace CategoriesSelector {
  export const selectAll = (s: State) => s.categories;

  export const selectForRoute = createSelector(
    selectAll,
    RouterSelector.selectMatchingRoute,
    (categoriesWish, route): Wish<Category> => {
      if (route === null) {
        return Wish.createVoid();
      }
      if (route.type === RouteType.Category) {
        return Wish.transform(categoriesWish, categories => {
          const maybeCategory = categories.find(cat => Category.getId(cat) === route.id);
          if (maybeCategory === undefined) {
            return Wish.createRejected(`Can't find category with id ${route.id}`);
          }
          return maybeCategory;
        });
      }
      return Wish.createVoid();
    }
  );
}
