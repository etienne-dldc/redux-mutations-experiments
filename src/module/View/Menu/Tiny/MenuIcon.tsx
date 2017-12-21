import * as React from 'react';
import { createPureComponent } from 'module/Common';

type Props = {
  height?: number;
};

export const MenuIcon = createPureComponent<Props>('MenuIcon', ({ height = 30 }) => {
  return (
    <svg width={height * 2} height={height} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <g id="Page-1" fill="none" fillRule="evenodd">
        {/* <rect id="Rectangle" fill="#D8D8D8" width="60" height="30" /> */}
        <g id="Group" transform="translate(14 6)" fill="#241770">
          <path
            d="M31,2 L1,2 C0.447,2 0,1.552 0,1 C0,0.448 0.447,0 1,0 L31,0 C31.553,0 32,0.448 32,1 C32,1.552 31.553,2 31,2"
            id="Fill-1"
          />
          <path
            d="M31,10 L1,10 C0.447,10 0,9.552 0,9 C0,8.448 0.447,8 1,8 L31,8 C31.553,8 32,8.448 32,9 C32,9.552 31.553,10 31,10"
            id="Fill-3"
          />
          <path
            d="M31,18 L1,18 C0.447,18 0,17.552 0,17 C0,16.448 0.447,16 1,16 L31,16 C31.553,16 32,16.448 32,17 C32,17.552 31.553,18 31,18"
            id="Fill-5"
          />
        </g>
      </g>
    </svg>
  );
});
