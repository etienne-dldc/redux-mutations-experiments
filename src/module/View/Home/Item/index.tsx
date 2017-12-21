import * as React from 'react';
import { createPureComponent } from 'module/Common';
import { PostListItem } from 'module/Model/PostList';
import { RouteType } from 'module/Model/Routes';
import { NavProvider, LocalizedText, HoverProvider } from 'module/View/Common';
import { Coordinates } from '../GridProvider';
import { MzImageSizeType } from 'module/Model/MzImage/MzImageSizeType';
import { ItemWrapper, LinkBlock, Overlay, TextOverlay } from './Item.s';

type Props = {
  item: PostListItem;
  coords: Coordinates;
};

export const Item = createPureComponent<Props>('PostListItem', ({ item, coords }) => {
  return (
    <HoverProvider>
      {hParams => (
        <NavProvider routeType={RouteType.Post} routeId={PostListItem.getId(item)}>
          {navParams => (
            <ItemWrapper coords={coords} innerRef={hParams.ref}>
              <LinkBlock {...navParams.getAnchorProps({})}>
                <img src={PostListItem.getCoverSrc(item, MzImageSizeType.MediumLarge)} alt="" width={coords.width} />
                <Overlay hover={hParams.hover} />
                <TextOverlay hover={hParams.hover}>
                  <LocalizedText content={PostListItem.getTitle(item)} />
                </TextOverlay>
              </LinkBlock>
            </ItemWrapper>
          )}
        </NavProvider>
      )}
    </HoverProvider>
  );
});
