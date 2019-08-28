import React from 'reactn';
import styled from 'styled-components';
import { theme } from '../styles';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.span``;
const VoteBox = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${({ dim }) =>
    dim ? theme.colors.grey : theme.colors.white};
`;

export default ({ name, vote, hideVote, ...rest }) => (
  <Container {...rest}>
    <Label>{name}</Label>
    <VoteBox dim={hideVote}>{hideVote ? '' : vote}</VoteBox>
  </Container>
);
