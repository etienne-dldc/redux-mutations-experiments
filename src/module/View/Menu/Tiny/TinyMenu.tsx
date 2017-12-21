import * as React from 'react';
import { createPureComponent, PathUtils } from 'module/Common';
import { Sizes, WishHandler, NavProvider } from 'module/View/Common';
import { Wish } from 'module/Model/Wish';
import { Wrapper, Header, WhiteIconSplitter, LangLink, MenuButtonWrapper } from './TinyMenu.s';
import { Icon } from './Icon';
import { LeftIcon } from './LeftIcon';
import { RightIcon } from './RightIcon';
import { HomeIcon } from './HomeIcon';
import { MenuIcon } from './MenuIcon';
import { connect } from 'react-redux';
import { MenuAction, MenuSelector } from 'module/Redux/Menu';
import { DispatchCompat } from 'lib/redux-yarl';
import { State } from 'module/Redux';
import { Items } from '../Items';
import { Menu } from 'module/Model/Menu';
import { RouterSelector } from 'module/Redux/Router';

const MenuWishHandler = WishHandler.create<Menu>();

type StateProps = {
  open: boolean;
  menuWish: Wish<Menu>;
  otherLang: PathUtils.Lang;
};

const mapStateToProps = (s: State): StateProps => ({
  open: MenuSelector.isOpen(s),
  menuWish: MenuSelector.selectMenu(s),
  otherLang: RouterSelector.selectOtherLang(s),
});

type DispatchProps = {
  toggle: () => void;
};

const mapDispatchToProps = (dispatch: DispatchCompat): DispatchProps => ({
  toggle: () => dispatch(MenuAction.toggleOpen()),
});

type OwnProps = {
  windowWidth: number;
};

type Props = StateProps & DispatchProps & OwnProps;

const TinyMenuComp = createPureComponent<Props>('TinyMenu', ({ open, toggle, windowWidth, menuWish, otherLang }) => {
  const size = Sizes.getTinyMenuHeight(windowWidth);
  return (
    <Wrapper open={open} size={size}>
      <MenuWishHandler
        wish={menuWish}
        handlePending={() => <div>Loading...</div>}
        handleResolved={menu => (
          <>
            <Header size={size}>
              <Icon size={size} glyph={<LeftIcon />} />
              <WhiteIconSplitter />
              <Icon size={size} glyph={<HomeIcon />} />
              <WhiteIconSplitter />
              <Icon size={size} glyph={<RightIcon />} />
              <NavProvider lang={otherLang}>
                {params => (
                  <LangLink {...params.getAnchorProps()} size={size}>
                    {otherLang === 'fr' ? 'Fr' : 'En'}
                  </LangLink>
                )}
              </NavProvider>
              <MenuButtonWrapper onClick={() => toggle()}>
                <MenuIcon height={size * 0.7} />
              </MenuButtonWrapper>
            </Header>
            {open && <Items items={Menu.getItems(menu)} categoryIds={Menu.getCategories(menu)} />}
          </>
        )}
      />
    </Wrapper>
  );
});

export const TinyMenu = connect(mapStateToProps, mapDispatchToProps)(TinyMenuComp);
