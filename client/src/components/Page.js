import styled from 'styled-components';
import { theme } from '../styles';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  background-color: ${theme.colors.white};
  box-sizing: border-box;
  max-height: 100vh;
`;

export const CenteredPage = styled(Page)`
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
