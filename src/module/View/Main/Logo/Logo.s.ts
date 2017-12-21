import styled from 'styled-components';
import { Colors } from 'module/View/Common';

type TextProps = {
  centered?: boolean;
  size?: number;
};

export const Text = styled.p`
  color: ${Colors.grey};
  text-align: ${(p: TextProps) => (p.centered ? 'center' : 'left')};
  color: ${Colors.logo.text};
  font-style: italic;
  font-weight: 400;
  font-size: ${(p: TextProps) => 1.8 * (p.size || 1)}rem;
  margin-top: 10px;
`;

type WrapperProps = {
  centered?: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(p: WrapperProps) => (p.centered ? 'center' : 'start')};
  padding: 20px;
`;
