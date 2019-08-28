import React from 'reactn';
import styled from 'styled-components';
import { theme } from '../styles';

const CopyLink = styled.div`
  font-size: 12px;
  color: ${theme.colors.black};
  background-color: ${theme.colors.lightGrey}
  padding: 8px;
  display: inline-block;
  cursor: pointer;
`;

export default props => (
  <CopyLink
    {...props}
    onClick={e => {
      navigator.clipboard.writeText(props.children).then(
        () => {},
        err => {
          console.error(err);
        }
      );
    }}
  ></CopyLink>
);
