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
  ${({ fill }) => fill && `background-color: ${fill};`}
`;

export default ({ name, vote, voted, hideVote, ...rest }) => (
  <Container {...rest}>
    <Label>{name}</Label>
    {hideVote ? (
      <VoteBox
        fill={voted ? theme.colors.success : theme.colors.lightGrey}
      ></VoteBox>
    ) : (
      <VoteBox>{vote}</VoteBox>
    )}
  </Container>
);
