import styled from 'styled-components';
import { theme } from '../styles';

const color = type => {
  switch (type) {
    case 'danger':
      return theme.colors.white;
    default:
      return theme.colors.black;
  }
};

const backgroundColor = type => {
  switch (type) {
    case 'danger':
      return theme.colors.danger;
    default:
      return theme.colors.primary;
  }
};

const hoverBackgroundColor = type => {
  switch (type) {
    case 'danger':
      return theme.colors.danger;
    default:
      return '#ffb700';
  }
};

export const Button = styled.button`
  background-color: ${({ type }) => backgroundColor(type)};
  color: ${({ type }) => color(type)};
  padding: 16px 20px;
  border: none;
  font-size: 18px;
  display: block;
  max-width: 200px;
  cursor: pointer;
  border-radius: 5px;
  text-transform: uppercase;

  :hover {
    background-color: ${({ type }) => hoverBackgroundColor(type)};
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
