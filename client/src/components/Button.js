import styled from 'styled-components';
import { theme } from '../styles';

export const Button = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.black};
  padding: 16px 20px;
  border: none;
  font-size: 18px;
  display: block;
  max-width: 200px;
  cursor: pointer;
  border-radius: 5px;
  text-transform: uppercase;

  :hover {
    background-color: #ffb700;
  }

  :disabled {
    background-color: ${theme.colors.lightGrey};
    color: ${theme.colors.grey};
  }
`;

export const SmallButton = styled(Button)`
  display: inline;
  font-size: 18px;
  padding: 0;
  color: ${theme.colors.primary};
  background-color: unset;
  text-decoration: underline;

  :hover {
    background-color: transparent;
  }
`;
