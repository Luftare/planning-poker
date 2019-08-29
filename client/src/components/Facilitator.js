import React from 'reactn';
import styled from 'styled-components';
import { FaCrown } from 'react-icons/fa';
import { theme } from '../styles';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  font-size: 24px;
  color: ${theme.colors.grey};
  margin-right: 10px;
`;

export default ({ name, onToggleEdit, editMode, facilitator, ...rest }) => {
  return (
    <Container {...rest}>
      <Label>{name}</Label>
      <FaCrown color={theme.colors.primary} size="24px" />
    </Container>
  );
};
