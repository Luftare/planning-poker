import React from 'reactn';
import { withRouter, Link } from 'react-router-dom';
import { CenteredPage } from '../components/Page';
import QRCode from 'qrcode.react';
import { theme } from '../styles';

export default withRouter(props => {
  const { roomId } = props.match.params;
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;

  return (
    <CenteredPage>
      <Link
        to={`/room/${roomId}`}
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          color: theme.colors.grey,
        }}
      >
        Back
      </Link>
      <QRCode value={`${window.location.host}/room/${roomId}`} size={size} />
      <div
        style={{
          margin: '16px',
          fontSize: '24px',
          overflowWrap: 'break-word',
          maxWidth: '80%',
        }}
      >{`${window.location.host}/room/${roomId}`}</div>
    </CenteredPage>
  );
});
