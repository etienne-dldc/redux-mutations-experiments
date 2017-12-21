import * as React from 'react';
import { createPureComponent } from 'module/Common';
import { TinyMenu } from './Tiny';
import { NormalMenu } from './Normal';

type Props = {
  tinyMenu: boolean;
  windowWidth: number;
};

export const Menu = createPureComponent<Props>('Menu', ({ tinyMenu, windowWidth }) => {
  return tinyMenu ? <TinyMenu windowWidth={windowWidth} /> : <NormalMenu />;
});
