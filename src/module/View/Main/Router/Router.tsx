import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteType } from 'module/Model/Routes';
import { State } from 'module/Redux';
import { RouterSelector } from 'module/Redux/Router';
import { NotFound } from '../NotFound';
import { HomeView } from '../../Home/HomeView';
import { PageView } from '../../PageView';
import { PostView } from '../../PostView';

type StateProps = {
  route: Route | null;
};

const mapStateToProps = (s: State): StateProps => ({
  route: RouterSelector.selectMatchingRoute(s),
});

type OwnProps = {
  windowWidth: number;
};

type Props = StateProps & OwnProps;

const RouterComp: React.SFC<Props> = ({ route, windowWidth }) => {
  if (route === null) {
    return <NotFound />;
  }
  switch (route.type) {
    case RouteType.Home:
    case RouteType.Category:
      return <HomeView categoryId={route.id} windowWidth={windowWidth} />;
    case RouteType.Page:
      return <PageView />;
    case RouteType.Post:
      return <PostView />;
    default:
      return <div>Unhandled type: {route.type}</div>;
  }
};

export const Router = connect(mapStateToProps)(RouterComp);
