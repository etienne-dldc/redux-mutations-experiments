import * as React from 'react';
import { createPureComponent } from 'module/Common';

type Props = {
  size?: number;
};

export const LeftIcon = createPureComponent<Props>('LeftIcon', ({ size = 30 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <g id="Page-1" fill="none" fillRule="evenodd">
        {/* <polygon id="Fill-1" fill="#D8D8D8" points="0 30 30 30 30 0 0 0" /> */}
        <polygon id="Fill-2" fill="#FFF" points="7 15.162 22.198 7 22.198 23.324" />
      </g>
    </svg>
  );
});
