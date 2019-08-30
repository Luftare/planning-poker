import React from 'reactn';
import styled from 'styled-components';
import FormLabel from './FormLabel';
import { FaCheck } from 'react-icons/fa';
import { theme } from '../styles';

const Container = styled.div`
  width: 100%;
`;
const InputContainer = styled.div`
  display: flex;
`;

const TextInput = styled.input`
  background-color: ${theme.colors.lightGrey};
  color: ${theme.colors.black};
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  border: 1px solid ${theme.colors.grey};
  box-sizing: border-box;
  width: 100%;
  margin-right: ${({ marginRight }) => (marginRight ? '8px' : 0)}

  :focus {
    border: 1px solid #fdc500;
    box-shadow: 0 4px 8px 0 rgba(253, 197, 0, 0.2),
      0 6px 10px 0 rgba(253, 197, 0, 0.2);
  }
`;

const ErrorText = styled.span`
  color: ${theme.colors.danger};
  font-size: 14px;
`;

export default ({
  children,
  label,
  error = '',
  verifySuccess,
  inlineContent,
  ...rest
}) => {
  return (
    <Container>
      {label && (
        <FormLabel>
          <span style={{ marginRight: '10px' }}>{label}</span>
          {error && <ErrorText>{error}</ErrorText>}
          {verifySuccess && !error && (
            <FaCheck size="16px" color={theme.colors.success} />
          )}
        </FormLabel>
      )}
      <InputContainer>
        <TextInput {...rest} marginRight={!!inlineContent}>
          {children}
        </TextInput>
        {inlineContent}
      </InputContainer>
    </Container>
  );
};
