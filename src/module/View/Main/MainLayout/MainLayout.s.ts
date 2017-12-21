import styled, { css } from 'styled-components';
import { Colors, Sizes } from 'module/View/Common';

export const Wrapper = styled.div`
  background: ${Colors.white};
  flex: 1;
`;

type ContentWrapperProps = {
  tinyMenu: boolean;
  tinyMenuHeight: number;
};

export const ContentWrapper = styled.div`
  position: relative;
  ${(p: ContentWrapperProps) =>
    p.tinyMenu
      ? css`
          margin-top: ${p.tinyMenuHeight}px;
        `
      : css`
          margin-left: ${Sizes.leftMenuWidth}px;
        `};
`;
