import React, { useGlobal, useEffect, useState } from 'reactn';
import styled from 'styled-components';
import { theme } from '../styles';

const Container = styled.div`
  pointer-events: none;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  overflow: hidden;
  z-index: 100;
`;

const Message = styled.div`
  pointer-events: all;
  padding: 16px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.danger};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-100%)')};
  opacity: ${({ show }) => (show ? 0.7 : 0)};
  transition: all 400ms;
  cursor: pointer;
`;

export default props => {
  const [error] = useGlobal('error');
  const [show, setShow] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(0);

  useEffect(() => {
    if (error) {
      clearTimeout(hideTimeout);
      setShow(true);

      const timeoutId = setTimeout(() => {
        setShow(false);
      }, 5000);

      setHideTimeout(timeoutId);
    }
    // eslint-disable-next-line
  }, [error]);

  const hideError = () => {
    clearTimeout(hideTimeout);
    setShow(false);
  };

  return (
    <Container {...props}>
      <Message show={show} onClick={hideError}>
        {error}
      </Message>
    </Container>
  );
};
