import styled from 'styled-components';
import { Colors } from 'module/View/Common';

type WrapperProps = {
  open: boolean;
  size: number;
};

export const Wrapper = styled.menu`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  height: ${(p: WrapperProps) => (p.open ? 'auto' : `${p.size}px`)};
  background-color: ${Colors.tinyMenu.yellow};
  margin: 0;
  padding: 0;
`;

type HeaderProps = {
  size: number;
};

export const Header = styled.div`
  background: ${Colors.tinyMenu.yellow};
  display: flex;
  align-items: stretch;
  height: ${(p: HeaderProps) => p.size}px;
`;

type IconWrapperProps = {
  size: number;
};

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p: IconWrapperProps) => p.size}px;
  height: ${(p: IconWrapperProps) => p.size}px;
  background: ${Colors.tinyMenu.blue};
  cursor: pointer;
`;

export const WhiteIconSplitter = styled.div`
  width: 3px;
  background: ${Colors.white};
`;

type LangLinkProps = {
  size: number;
};

export const LangLink = styled.a`
  color: ${Colors.tinyMenu.blue};
  font-size: ${(p: LangLinkProps) => p.size * 0.5}px;
  line-height: ${(p: LangLinkProps) => p.size}px;
  text-decoration: none;
  margin-left: 20px;
  font-weight: 500;
  font-style: italic;
  cursor: pointer;

  &:hover {
    color: ${Colors.tinyMenu.blueHover};
  }
`;

export const MenuButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: start;
  cursor: pointer;
`;
