import React from 'reactn';
import styled from 'styled-components';
import { FaBan, FaCrown } from 'react-icons/fa';
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
  onAssignToFacilitator,
  showControls,
  ...rest
}) => {
  const controls = showControls && (
    <>
      <FaBan
        onClick={onRemove}
        size="24px"
        color={theme.colors.danger}
        style={{ marginRight: '16px', cursor: 'pointer' }}
      >
        x
      </FaBan>
      <FaCrown
        onClick={onAssignToFacilitator}
        size="24px"
        color={theme.colors.primary}
        style={{ marginRight: '16px', cursor: 'pointer' }}
      >
        sm
      </FaCrown>
    </>
  );

  const indicator = hideVote ? (
    <VoteBox fill={voted ? theme.colors.success : theme.colors.lightGrey} />
  ) : (
    <VoteBox>{vote}</VoteBox>
  );

  return (
    <Container {...rest}>
      <LabelContainer>
        {controls}
        <Label>{name}</Label>
      </LabelContainer>
      {!showControls && indicator}
    </Container>
  );
};
