import styled, { css } from 'styled-components';
import { Coordinates } from '../GridProvider';
import { Colors } from 'module/View/Common';

type ItemWrapperProps = {
  coords: Coordinates;
};

export const ItemWrapper = styled.div`
  background: #f44336;
  position: absolute;
  transitionduration: 0.3;
  overflow: hidden;
  ${(p: ItemWrapperProps) => css`
    left: ${p.coords.left}px;
    top: ${p.coords.top}px;
    width: ${p.coords.width}px;
    height: ${p.coords.height}px;
  `};
`;

export const LinkBlock = styled.a`
  position: absolute;
  display: block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: white;
  cusor: pointer;
  font-size: 2rem;
  &:hover {
    color: white;
  }
`;

type HoverProps = {
  hover: boolean;
};

const hoverSwitch = <T>(notHover: T, hover: T) => (p: HoverProps): T => (p.hover ? hover : notHover);
const hoverSwitchFunc = <T>(notHover: T, hover: T, render: (v: T) => string) => (p: HoverProps): string =>
  render(p.hover ? hover : notHover);

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition-duration: 0.3s;
  background: ${hoverSwitchFunc(0, 0.8, a => Colors.darkGrey.alpha(a).toString())};
`;

export const TextOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: ${hoverSwitch('0', '1')};
  transform: translateY(${hoverSwitch('-30', '0')}%);
`;
