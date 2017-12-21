import * as React from 'react';
import { createPureComponent } from 'module/Common';

type Props = {};

export const PageView = createPureComponent<Props>('PageView', ({}) => {
  return <div>Page</div>;
});
