import styled from 'styled-components';
import { theme } from '../styles';

export const TextInput = styled.input`
  background-color: ${theme.colors.lightGrey};
  color: ${theme.colors.black};
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid ${theme.colors.grey};

  :focus {
    border: 1px solid #fdc500;
    box-shadow: 0 4px 8px 0 rgba(253, 197, 0, 0.2),
      0 6px 10px 0 rgba(253, 197, 0, 0.2);
  }
`;
