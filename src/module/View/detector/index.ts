import { Detectors, Detector } from 'module/Redux';
import { nn } from 'module/Common';
import { Wish } from 'module/Model/Wish';
import { WishCollection } from 'module/Model/WishCollection';
import { MenuAction } from 'module/Redux/Menu';
import { CategoriesAction } from 'module/Redux/Categories';
import { PostListAction } from 'module/Redux/PostList';
import { RouterSelector } from 'module/Redux/Router';
import { PageAction } from 'module/Redux/Page';
import { PostAction } from 'module/Redux/Post';
import { RouteType } from 'module/Model/Routes';

const ensureMenuFetched: Detector = s => {
  if (Wish.isVoid(s.menu)) {
    return MenuAction.fetchMenu();
  }
  return null;
};

const ensureCategoriesFetched: Detector = s => {
  if (Wish.isVoid(s.categories)) {
    return CategoriesAction.fetchCategories();
  }
  return null;
};

const ensurePostListFetched: Detector = s => {
  const routeType = RouterSelector.selectMatchingRouteType(s);
  if (!routeType) {
    return null;
  }
  const needPostList = routeType === RouteType.Category || routeType === RouteType.Home;
  if (needPostList && Wish.isVoid(s.postList)) {
    return PostListAction.fetchPostList();
  }
  return null;
};

const ensureCurrentPageFetched: Detector = s => {
  const route = RouterSelector.selectMatchingRoute(s);
  if (!route || !route.type || route.type !== RouteType.Page) {
    return null;
  }
  const pageId = nn(route.id);
  if (WishCollection.selectIsVoidByKey(s.page, pageId)) {
    return PageAction.fetchPage(pageId);
  }
  return null;
};

const ensureCurrentPostFetched: Detector = s => {
  const route = RouterSelector.selectMatchingRoute(s);
  if (!route || !route.type || route.type !== RouteType.Post) {
    return null;
  }
  const postId = nn(route.id);
  if (WishCollection.selectIsVoidByKey(s.post, postId)) {
    return PostAction.fetchPost(postId);
  }
  return null;
};

export const detectors: Detectors = [
  ensureMenuFetched,
  ensureCategoriesFetched,
  ensurePostListFetched,
  ensureCurrentPageFetched,
  ensureCurrentPostFetched,
];
