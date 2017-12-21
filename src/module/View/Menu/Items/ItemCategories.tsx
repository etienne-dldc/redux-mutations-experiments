import * as React from 'react';
import { List } from 'immutable';
import { createPureComponent } from 'module/Common';
import { MenuItemCategories } from 'module/Model/Menu';
import { Categories, Category } from 'module/Model/Categories';
import { State } from 'module/Redux';
import { CategoriesSelector } from 'module/Redux/Categories/CategoriesSelector';
import { connect } from 'react-redux';
import { RouteType } from 'module/Model/Routes';
import { MenuAction } from 'module/Redux/Menu';
import { DispatchCompat } from 'lib/redux-yarl';
import { Wrapper, Item, CatLink } from './ItemCategories.s';
import { NavProvider, WishHandler, LocalizedText } from 'module/View/Common';
import { Wish } from 'module/Model/Wish';

const CategoriesWishHandler = WishHandler.create<Categories>();

type StateProps = {
  categoriesWish: Wish<Categories>;
};

const mapStateToProps = (state: State): StateProps => ({
  categoriesWish: CategoriesSelector.selectAll(state),
});

type DispatchProps = {
  closeMenu: () => void;
};

const mapDispatchToProps = (dispatch: DispatchCompat): DispatchProps => ({
  closeMenu: () => dispatch(MenuAction.setClose()),
});

type OwnProps = {
  item: MenuItemCategories;
  categoryIds: List<number>;
};

type Props = StateProps & DispatchProps & OwnProps;

const ItemCategoriesComp = createPureComponent<Props>(
  'ItemCategories',
  ({ item, categoriesWish, categoryIds, closeMenu }) => {
    return (
      <Wrapper>
        <CategoriesWishHandler
          wish={categoriesWish}
          handleResolved={categories => (
            <>
              {categories.map((category, index) => (
                <Item key={Category.getId(category)}>
                  <NavProvider routeType={RouteType.Category} routeId={Category.getId(category)}>
                    {params => (
                      <CatLink
                        {...params.getAnchorProps({
                          onClick: () => closeMenu(),
                        })}
                        isLast={index === categories.size - 1}
                        isActive={params.isActive || false}
                      >
                        <LocalizedText content={Category.getName(category)} />
                      </CatLink>
                    )}
                  </NavProvider>
                </Item>
              ))}
            </>
          )}
        />
      </Wrapper>
    );
  }
);

export const ItemCategories = connect(mapStateToProps, mapDispatchToProps)(ItemCategoriesComp);
