import * as React from 'react';
import { RouteType } from 'module/Model/Routes';
import styled from 'styled-components';
import { Logo } from '../Logo';
import { createPureComponent } from 'module/Common';
import { NavProvider } from 'module/View/Common';

type LogoLinkProps = {
  centered?: boolean;
  size?: number;
};

const LogoLinkWrapper = styled.a`
  display: block;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export const LogoLink = createPureComponent<LogoLinkProps>('LogoLink', ({ ...logoProps }) => (
  <NavProvider routeType={RouteType.Home}>
    {params => (
      <LogoLinkWrapper {...params.getAnchorProps()}>
        <Logo {...logoProps} />
      </LogoLinkWrapper>
    )}
  </NavProvider>
));
