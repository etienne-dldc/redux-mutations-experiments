import * as React from 'react';
import { createPureComponent } from 'module/Common';
import { MenuItemPostLink } from 'module/Model/Menu';
import { State } from 'module/Redux';
import { connect } from 'react-redux';
import { RouteType } from 'module/Model/Routes';
import { MenuAction } from 'module/Redux/Menu';
import { DispatchCompat } from 'lib/redux-yarl';
import { Wrapper } from './ItemPostLink.s';
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
  item: MenuItemPostLink;
};

type Props = StateProps & DispatchProps & OwnProps;

const ItemPostLinkComp = createPureComponent<Props>('ItemPostLink', ({ item, closeMenu }) => {
  return (
    <NavProvider routeType={RouteType.Post} routeId={MenuItemPostLink.getPostId(item)}>
      {params => (
        <Wrapper
          {...params.getAnchorProps({
            onClick: () => closeMenu(),
          })}
        >
          <LocalizedText content={MenuItemPostLink.getTitle(item)} />
        </Wrapper>
      )}
    </NavProvider>
  );
});

export const ItemPostLink = connect(mapStateToProps, mapDispatchToProps)(ItemPostLinkComp);
