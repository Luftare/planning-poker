import React, { useGlobal } from 'reactn';
import { FaCopy } from 'react-icons/fa';
import styled from 'styled-components';
import { theme } from '../styles';

const CopyLink = styled.div`
  font-size: 12px;
  color: ${theme.colors.grey};
  background-color: ${theme.colors.lightGrey}
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  > svg {
    transition: all 500ms;
  }
  
  :active svg {
    fill: ${theme.colors.primary};
    transition: none;
  }
`;

export default props => {
  const [, setInfo] = useGlobal('info');
  const [, setError] = useGlobal('error');

  return (
    <CopyLink
      {...props}
      onClick={e => {
        setInfo('');
        navigator.clipboard.writeText(props.children).then(
          () => {
            setInfo('Copied to clipboard.');
          },
          err => {
            setError(err);
          }
        );
      }}
    >
      Share url <FaCopy size="14px" style={{ marginLeft: '8px' }} />
    </CopyLink>
  );
};
