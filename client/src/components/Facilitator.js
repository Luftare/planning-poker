import React from 'reactn';
import styled from 'styled-components';
import { FaCrown, FaPen } from 'react-icons/fa';
import { theme } from '../styles';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.span`
  font-size: 24px;
  color: ${theme.colors.grey};
  margin-right: 10px;
`;

export default ({ name, onToggleEdit, editMode, facilitator, ...rest }) => {
  return (
    <Container {...rest}>
      <div>
        <Label>{name}</Label>
        <FaCrown color={theme.colors.primary} size="24px" />
      </div>
      {facilitator && (
        <FaPen
          onClick={onToggleEdit}
          color={editMode ? theme.colors.black : theme.colors.grey}
          style={{ cursor: 'pointer' }}
          size="20px"
        />
      )}
    </Container>
  );
};
