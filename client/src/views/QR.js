import React from 'reactn';
import { withRouter, Link } from 'react-router-dom';
import { CenteredPage } from '../components/Page';
import QRCode from 'qrcode.react';

export default withRouter(props => {
  const { roomId } = props.match.params;
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;

  return (
    <CenteredPage>
      <Link
        to={`/${roomId}`}
        style={{ position: 'absolute', top: '8px', left: '8px' }}
      >
        Back
      </Link>
      <QRCode value={`${window.location.host}/${roomId}`} size={size} />
      {`${window.location.host}/${roomId}`}
    </CenteredPage>
  );
});
