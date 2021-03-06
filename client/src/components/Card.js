import React from 'reactn';
import styled from 'styled-components';
import { theme } from '../styles';

const Container = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: ${theme.colors.lightGrey};
  height: 80px;
  font-size: 32px;
  cursor: pointer;
  font-weight: 300;
`;

export default ({ label, ...rest }) => <Container {...rest}>{label}</Container>;
