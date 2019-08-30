import styled from 'styled-components';
import { theme } from '../styles';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  background-color: ${theme.colors.white};
  box-sizing: border-box;
  min-height: 100vh;
  overflow: scroll;
`;

export const CenteredPage = styled(Page)`
  align-items: center;
  justify-content: center;
`;

export const HorizontallyCenteredPage = styled(Page)`
  align-items: center;
  justify-content: flex-start;
`;
