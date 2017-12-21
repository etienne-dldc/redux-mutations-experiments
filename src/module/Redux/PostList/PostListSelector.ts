import { State } from '../index';
import { CategoriesSelector } from 'module/Redux/Categories';
import { createSelector } from 'reselect';
import { Wish } from 'module/Model/Wish';
import { List } from 'immutable';
import { PostListItem } from 'module/Model/PostList';
import { RouterSelector } from 'module/Redux/Router';
import { RouteType } from 'module/Model/Routes';
import { Category } from 'module/Model/Categories';

export namespace PostListSelector {
  export const select = (s: State) => s.postList;

  export const selectForRoute = createSelector(
    RouterSelector.selectMatchingRoute,
    select,
    CategoriesSelector.selectForRoute,
    (route, postsWish, categoryWish): Wish<List<PostListItem>> => {
      if (route && route.type === RouteType.Category) {
        return Wish.combine([postsWish, categoryWish], (posts, category) => {
          const catId = Category.getId(category);
          return posts.filter(post => {
            return PostListItem.hasCategoryId(post, catId);
          });
        });
      }
      return postsWish;
    }
  );
}
