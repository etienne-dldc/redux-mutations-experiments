import * as React from 'react';
import { createPureComponent } from 'module/Common';
import { IconWrapper } from './TinyMenu.s';

type WithSize = { size?: number };

type Props = {
  glyph: React.ReactElement<WithSize>;
  size?: number;
};

export const Icon = createPureComponent<Props>('Icon', ({ glyph, size = 30 }) => {
  return <IconWrapper size={size}>{React.cloneElement<WithSize, any>(glyph, { size: size * 0.7 })}</IconWrapper>;
});
