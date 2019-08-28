import styled from 'styled-components';
import { theme } from '../styles';

export const Button = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.black};
  padding: 8px 16px;
  border: none;
  font-size: 24px;
  display: block;
  max-width: 200px;
`;
