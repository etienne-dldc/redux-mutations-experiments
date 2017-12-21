import * as React from 'react';
import { connect } from 'react-redux';
import { push } from '@etienne-dldc/redux-router-location';
import { RouteType } from 'module/Model/Routes';
import { State } from 'module/Redux';
import { RouterSelector } from 'module/Redux/Router';
import { createPureComponent, PathUtils } from 'module/Common';

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type AnchorMouseEvent = React.MouseEvent<HTMLAnchorElement>;

type UserProps = { onClick?: () => void };

type Params = {
  getAnchorProps: (userProps?: UserProps) => AnchorProps;
  isActive: boolean | null;
};

type OwnProps = {
  routeType?: RouteType;
  lang?: PathUtils.Lang;
  routeId?: number | null;
  noHistoryPush?: boolean;
  children: (params: Params) => JSX.Element;
};

type StateProps = {
  isMatching: boolean | null;
  routePath: string | null;
};

const mapStateToProps = (state: State, props: OwnProps): StateProps => {
  const currentRoute = RouterSelector.selectMatchingRoute(state);
  const routeType = props.routeType !== undefined ? props.routeType : currentRoute ? currentRoute.type : null;
  const routeId =
    props.routeId === undefined && props.routeType === undefined
      ? currentRoute ? currentRoute.id : null
      : props.routeId;
  return {
    isMatching: routeType ? RouterSelector.routeIsMatching(state, routeType, routeId, props.lang) : false,
    routePath: routeType ? RouterSelector.routePathByTypeAndId(state, routeType, routeId, props.lang) : '/',
  };
};

type DispatchProp = {
  navigate: (path: string) => void;
};

const mapDispatchToProps = (dispatch: (action: any) => void, props: OwnProps): DispatchProp => {
  return {
    navigate: (path: string) => {
      dispatch(push(path));
    },
  };
};

type Props = OwnProps & DispatchProp & StateProps;

function isModifiedEvent(event: AnchorMouseEvent): boolean {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

const NavProviderComp = createPureComponent<Props>(
  'NavProvider',
  ({ children, navigate, isMatching, routePath, routeId, noHistoryPush = false }) => {
    const getAnchorProps = (userProps: UserProps = {}): AnchorProps => {
      return {
        onClick: (event: AnchorMouseEvent, target?: string) => {
          if (
            !event.defaultPrevented && // onClick prevented default
            event.button === 0 && // ignore right clicks
            !target && // let browser handle "target=_blank" etc.
            !isModifiedEvent(event) // ignore clicks with modifier keys
          ) {
            event.preventDefault();
            if (userProps.onClick) {
              userProps.onClick();
            }
            if (routePath && noHistoryPush === false) {
              navigate(routePath);
            }
          }
        },
        href: routePath === null ? undefined : routePath,
      };
    };

    return children({
      getAnchorProps,
      isActive: isMatching,
    });
  }
);

export const NavProvider = connect(mapStateToProps, mapDispatchToProps)(NavProviderComp);
