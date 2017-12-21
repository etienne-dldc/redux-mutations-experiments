import * as React from 'react';
import { connect } from 'react-redux';
import { createPureComponent } from 'module/Common';
import { PostList } from 'module/Model/PostList';
import { PostListSelector } from 'module/Redux/PostList';
import { State } from 'module/Redux';
import { PostListItem } from 'module/Model/PostList/PostListItem';
import { WishHandler, Sizes } from 'module/View/Common';
import { Wish } from 'module/Model/Wish';
import { GridProvider } from '../GridProvider';
import { Item } from '../Item';

const PostListHandler = WishHandler.create<PostList>();

type StateProps = {
  postListWish: Wish<PostList>;
};

const mapStateToProps = (s: State): StateProps => ({
  postListWish: PostListSelector.selectForRoute(s),
});

type OwnProps = {
  categoryId: number | null;
  windowWidth: number;
};

type Props = OwnProps & StateProps;

const HomeViewComp = createPureComponent<Props>('HomeView', ({ postListWish, categoryId, windowWidth }) => {
  return (
    <PostListHandler
      wish={postListWish}
      handleResolved={posts => {
        return (
          <GridProvider postList={posts} availableWidth={Sizes.getContentWidth(windowWidth)}>
            {gridParams => (
              <div style={{ position: 'relative', height: gridParams.size }}>
                {posts
                  .map((post, index) => {
                    const coord = gridParams.items.get(index);
                    if (coord === undefined) {
                      return null;
                    }
                    const postId = PostListItem.getId(post);
                    return <Item key={postId} item={post} coords={coord} />;
                  })
                  .toArray()}
              </div>
            )}
          </GridProvider>
        );
      }}
    />
  );
});

export const HomeView = connect(mapStateToProps)(HomeViewComp);
