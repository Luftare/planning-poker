import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import { FaQrcode, FaBars } from 'react-icons/fa';
import { theme } from '../styles';
import CopyLink from './CopyLink';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & svg {
    cursor: pointer;
    fill: ${theme.colors.grey};

    :hover {
      fill: ${theme.colors.black};
    }
  }
`;

export default props => {
  const [, setShowMenu] = useGlobal('showMenu');
  const [roomId] = useGlobal('roomId');

  return (
    <Container {...props}>
      <Link to={`/room/${roomId}/qr`}>
        <FaQrcode size="24px" />
      </Link>
      <CopyLink>{window.location.href}</CopyLink>
      <FaBars size="24px" onClick={() => setShowMenu(true)} />
    </Container>
  );
};
