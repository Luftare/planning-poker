import styled from 'styled-components';
import { theme } from '../styles';

export default styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  color: ${theme.colors.grey};
  margin: 12px 0;

  * {
    font-weight: 400;
  }
`;
