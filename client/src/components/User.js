import React from 'reactn';
import styled from 'styled-components';
import { theme } from '../styles';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LabelContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Label = styled.span`
  font-size: 24px;
  color: ${theme.colors.grey};
`;
const RemoveButton = styled.span`
  color: ${theme.colors.danger};
  margin-right: 16px;
  fontsize: 26px;
  cursor: pointer;
`;
const VoteBox = styled.span`
  font-size: 24px;
  display: inline-block;
  font-weight: 500;
  width: 25px;
  height: 25px;
  ${({ fill }) => fill && `background-color: ${fill};`}
`;

export default ({
  name,
  vote,
  voted,
  hideVote,
  onRemove,
  canRemove,
  ...rest
}) => {
  // Yes, that ternary madness is crap
  return (
    <Container {...rest}>
      <LabelContainer>
        {canRemove && <RemoveButton onClick={onRemove}>x</RemoveButton>}
        <Label>{name}</Label>
      </LabelContainer>
      {hideVote ? (
        <VoteBox
          fill={voted ? theme.colors.success : theme.colors.lightGrey}
        ></VoteBox>
      ) : (
        <VoteBox>{vote}</VoteBox>
      )}
    </Container>
  );
};
