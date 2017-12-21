import * as React from 'react';
import { createPureComponent } from 'module/Common';
import { List } from 'immutable';
import { PostList, PostListItem } from 'module/Model/PostList';

export type Coordinates = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Params = {
  size: number;
  items: List<Coordinates>;
};

type Props = {
  postList: PostList;
  availableWidth: number;
  children: (params: Params) => React.ReactElement<any>;
};

export const GridProvider = createPureComponent<Props>('GridProvider', ({ postList, availableWidth, children }) => {
  const space = 20;
  const idealColWidth = 300;
  const minColNum = 2;
  const numOfCol = Math.max(minColNum, Math.floor(availableWidth / idealColWidth));
  const colSize = Math.floor((availableWidth - space * (numOfCol + 1)) / numOfCol);
  const rest = availableWidth - ((colSize + space) * numOfCol + space);
  const leftAdd = Math.floor(rest / 2);

  // compute positions
  const cols: Array<number> = Array(numOfCol).fill(0);
  const items = postList
    .map(post => {
      const colIndex = cols.indexOf(Math.min(...cols));
      const coverRatio = PostListItem.getCoverRatio(post);
      const height = Math.floor(colSize / coverRatio);
      const coord: Coordinates = {
        width: colSize,
        height,
        left: leftAdd + colIndex * colSize + space * (colIndex + 1),
        top: cols[colIndex] + space,
      };
      cols[colIndex] = cols[colIndex] + height + space;
      return coord;
    })
    .toList();

  const params: Params = {
    items,
    size: Math.max(...cols) + space,
  };
  return children(params);
});
