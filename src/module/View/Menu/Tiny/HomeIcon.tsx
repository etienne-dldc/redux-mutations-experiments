import * as React from 'react';
import { createPureComponent } from 'module/Common';

type Props = {
  size?: number;
};

export const HomeIcon = createPureComponent<Props>('HomeIcon', ({ size = 30 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <g id="Page-1" fill="none" fillRule="evenodd">
        {/* <polygon id='Fill-1' fill='#0D094C' points='0 30 30 30 30 0 0 0' /> */}
        <g id="Group" transform="translate(6 6)" fill="#FFF">
          <polygon id="Fill-2" points="0 0.0246102109 6.9764598 0 7 6.97538979 0.0246102109 7" />
          <polygon id="Fill-3" points="11 0.0246102109 17.9753898 0 18 6.97538979 11.0235402 7" />
          <polygon id="Fill-4" points="0 11.0246102 6.9764598 11 7 17.9753898 0.0246102109 18" />
          <polygon id="Fill-5" points="11 11.0246102 17.9753898 11 18 17.9753898 11.0235402 18" />
        </g>
      </g>
    </svg>
  );
});
