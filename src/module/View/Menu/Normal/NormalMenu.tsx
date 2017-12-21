import * as React from 'react';
import { createPureComponent } from 'module/Common';
import { Wrapper } from './NormalMenu.s';

type Props = {};

export const NormalMenu = createPureComponent<Props>('NormalMenu', () => {
  return <Wrapper>Normal Menu</Wrapper>;
});
