import styled from 'styled-components';
import { theme } from '../styles';

export const TextInput = styled.input`
  background-color: ${theme.colors.lightGrey};
  color: ${theme.colors.black};
  padding: 4px;
  border: none;
  font-size: 24px;
  max-width: 200px;
`;
