import styled from 'styled-components';
import { theme } from '../styles';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  background-color: ${theme.colors.white};
`;

export const CenteredPage = styled(Page)`
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
