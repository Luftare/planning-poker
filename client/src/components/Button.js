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

export const SmallButton = styled(Button)`
  display: inline;
  font-size: 18px;
  padding: 0;
  color: ${theme.colors.primary};
  background-color: unset;
  text-decoration: underline;
`;
