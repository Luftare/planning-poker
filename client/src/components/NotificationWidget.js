import React, { useGlobal, useEffect, useState } from 'reactn';
import styled from 'styled-components';
import { theme } from '../styles';

const typeStyles = {
  color: {
    error: theme.colors.white,
    info: theme.colors.white,
  },
  backgroundColor: {
    error: theme.colors.danger,
    info: theme.colors.info,
  },
};

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
  padding: 8px;
  font-size: 14px;
  color: ${({ type }) => typeStyles.color[type]};
  background-color: ${({ type }) => typeStyles.backgroundColor[type]};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-100%)')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: all 400ms;
  cursor: pointer;
`;

export default ({ topic, type, ...rest }) => {
  const [message] = useGlobal(topic);
  const [show, setShow] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(0);

  useEffect(() => {
    if (message) {
      clearTimeout(hideTimeout);
      setShow(true);

      const timeoutId = setTimeout(() => {
        setShow(false);
      }, 2500);

      setHideTimeout(timeoutId);
    }
    // eslint-disable-next-line
  }, [message]);

  const hideError = () => {
    clearTimeout(hideTimeout);
    setShow(false);
  };

  return (
    <Container {...rest}>
      <Message show={show} onClick={hideError} type={type}>
        {message}
      </Message>
    </Container>
  );
};
