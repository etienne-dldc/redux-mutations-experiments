import * as React from 'react';
import { Wrapper, ContentWrapper } from './MainLayout.s';
import { Menu } from 'module/View/Menu';
import { Router } from '../Router';
import { createPureComponent } from 'module/Common';
import { LogoLink } from '../LogoLink';
import { State } from 'module/Redux';
import { MenuSelector, MenuAction } from 'module/Redux/Menu';
import { connect } from 'react-redux';
import { DispatchCompat } from 'lib/redux-yarl';
import { TouchDetect, WindowSizeProvider, Sizes } from 'module/View/Common';

type StateProps = {
  menuOpen: boolean;
};

const mapStateToProps = (s: State): StateProps => ({
  menuOpen: MenuSelector.isOpen(s),
});

type DispatchProps = {
  closeMenu: () => void;
};

const mapDispatchToProps = (dispatch: DispatchCompat): DispatchProps => ({
  closeMenu: () => dispatch(MenuAction.setClose()),
});

type Props = StateProps & DispatchProps;

const MainLayoutComp = createPureComponent<Props>('MainLayout', ({ closeMenu, menuOpen }) => {
  return (
    <WindowSizeProvider>
      {({ width, height }) => {
        const tinyMenu = Sizes.isTinyMenu(width);
        return (
          <TouchDetect>
            {isTouch => (
              <Wrapper
                onClick={() => {
                  if (menuOpen) {
                    closeMenu();
                  }
                }}
              >
                <Menu tinyMenu={tinyMenu} windowWidth={width} />
                <ContentWrapper tinyMenu={tinyMenu} tinyMenuHeight={Sizes.getTinyMenuHeight(width)}>
                  {tinyMenu && <LogoLink centered={true} size={1.3} />}
                  <Router windowWidth={width} />
                </ContentWrapper>
              </Wrapper>
            )}
          </TouchDetect>
        );
      }}
    </WindowSizeProvider>
  );
});

export const MainLayout = connect(mapStateToProps, mapDispatchToProps)(MainLayoutComp);
