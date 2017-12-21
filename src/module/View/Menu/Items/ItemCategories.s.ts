import styled, { css } from 'styled-components';
import { Colors } from 'module/View/Common';

export const Wrapper = styled.ul`
  background: ${Colors.tinyMenu.blue};
  margin: 0;
  padding: 20px 20px 10px 20px;
  list-style: none;
`;

export const Item = styled.li``;

type CatLinkProps = {
  isLast: boolean;
  isActive: boolean;
};

export const CatLink = styled.a`
  color: ${Colors.white};
  padding: 5px 10px;
  display: block;
  font-size: 2rem;
  font-style: ${(p: CatLinkProps) => (p.isActive ? 'normal' : 'italic')};
  ${(p: CatLinkProps) =>
    p.isLast
      ? ''
      : css`
          border-bottom: 2px solid ${Colors.tinyMenu.yellow};
        `};
  &:hover {
    text-decoration: none;
    font-style: normal;
    color: ${Colors.white};
  }
`;
