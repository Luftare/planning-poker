import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles';

const Container = styled.div`
  width: 100%;
  max-width: 300px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;
`;

const Option = styled.div`
  background-color: ${theme.colors.lightGrey};
  box-sizing: border-box;
  border: ${({ active }) =>
    active ? `solid ${theme.colors.grey} 2px` : 'solid transparent 2px'};
  color: ${theme.colors.black};
  padding: 8px 16px;
  font-size: 24px;
`;

export const OptionGroup = ({ options, activeIndex, onChange }, ...rest) => {
  return (
    <Container {...rest}>
      {options.map((option, index) => (
        <Option
          key={option}
          active={activeIndex === index}
          onClick={() => activeIndex !== index && onChange && onChange(index)}
        >
          {option}
        </Option>
      ))}
    </Container>
  );
};
