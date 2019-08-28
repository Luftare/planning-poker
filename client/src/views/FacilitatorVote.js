import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { CenteredPage } from '../components/Page';

export default withRouter(props => {
  const { roomId } = props.match.params;

  return (
    <CenteredPage>
      Facilitator:{' '}
      <a
        href={`${window.location.host}/${roomId}`}
      >{`${window.location.host}/${roomId}`}</a>
      <Link to="/">Home</Link>
    </CenteredPage>
  );
});
