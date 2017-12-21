import { State } from '../state';
import { createSelector } from 'reselect';
import { Route, RouteType } from 'module/Model/Routes';
import { PathUtils } from 'module/Common';

export namespace RouterSelector {
  const selectPathname = (s: State) => s.location.pathname;

  const selectRoutes = (s: State) => s.routes;

  export const selectLang = createSelector(selectPathname, (pathname): PathUtils.Lang => {
    return PathUtils.getLangOnPath(pathname);
  });

  export const selectOtherLang = createSelector(selectLang, (lang): PathUtils.Lang => {
    return lang === 'fr' ? 'en' : 'fr';
  });

  export const selectPathnameHasLang = createSelector(selectPathname, (pathname): boolean => {
    return PathUtils.pathHasLang(pathname);
  });

  export const selectRoute = createSelector(selectPathname, (pathname): string => {
    return PathUtils.removeLangOnPath(pathname);
  });

  export const selectMatchingRoute = createSelector(selectRoute, selectRoutes, (route, routes): Route | null => {
    const routeObj = routes[route];
    if (routeObj) {
      return routeObj;
    }
    return null;
  });

  export const selectMatchingRouteType = createSelector(selectMatchingRoute, (route): RouteType | null => {
    if (!route) {
      return null;
    }
    return route.type;
  });

  export const routeIsMatching = (
    s: State,
    routeType: RouteType,
    routeId: number | null = null,
    lang?: PathUtils.Lang
  ): boolean => {
    const route = selectMatchingRoute(s);
    const langMatching = lang === undefined ? true : selectLang(s) === lang;
    if (!route) {
      return false;
    }
    return langMatching && route.type === routeType && route.id === routeId;
  };

  export const routeByTypeId = (s: State, routeType: RouteType, routeId: number | null = null): Route | null => {
    const routes = selectRoutes(s);
    const routeKey = Object.keys(routes).find(k => {
      return routes[k].type === routeType && routes[k].id === routeId;
    });
    if (routeKey) {
      return routes[routeKey];
    }
    return null;
  };

  export const routePathByTypeAndId = (
    s: State,
    routeType: RouteType,
    routeId: number | null = null,
    lang?: PathUtils.Lang
  ): string | null => {
    const theLang = lang === undefined ? selectLang(s) : lang;
    const route = routeByTypeId(s, routeType, routeId);
    if (!route) {
      return null;
    }
    return PathUtils.addLangToPath(route.path, theLang);
  };
}
