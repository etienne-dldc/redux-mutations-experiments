import * as React from 'react';
import { createPureComponent } from 'module/Common';
import { MenuItemPageLink } from 'module/Model/Menu';
import { State } from 'module/Redux';
import { connect } from 'react-redux';
import { RouteType } from 'module/Model/Routes';
import { MenuAction } from 'module/Redux/Menu';
import { DispatchCompat } from 'lib/redux-yarl';
import { Wrapper } from './ItemPageLink.s';
import { NavProvider, LocalizedText } from 'module/View/Common';

type StateProps = {};

const mapStateToProps = (state: State): StateProps => ({});

type DispatchProps = {
  closeMenu: () => void;
};

const mapDispatchToProps = (dispatch: DispatchCompat): DispatchProps => ({
  closeMenu: () => dispatch(MenuAction.setClose()),
});

type OwnProps = {
  item: MenuItemPageLink;
};

type Props = StateProps & DispatchProps & OwnProps;

const ItemPageLinkComp = createPureComponent<Props>('ItemPageLink', ({ item, closeMenu }) => {
  return (
    <NavProvider routeType={RouteType.Page} routeId={MenuItemPageLink.getPageId(item)}>
      {params => (
        <Wrapper
          {...params.getAnchorProps({
            onClick: () => closeMenu(),
          })}
        >
          <LocalizedText content={MenuItemPageLink.getTitle(item)} />
        </Wrapper>
      )}
    </NavProvider>
  );
});

export const ItemPageLink = connect(mapStateToProps, mapDispatchToProps)(ItemPageLinkComp);
