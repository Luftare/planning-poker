import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { CenteredPage } from '../components/Page';
import { Button } from '../components/Button';
import Users from '../components/Users';

export default withRouter(props => {
  const { socket, history } = props;
  const { roomId } = props.match.params;

  const [name] = useGlobal('name');
  const [facilitator] = useGlobal('facilitator');
  const [, setUsers] = useGlobal('users');

  useEffect(() => {
    if (!name && !facilitator) {
      history.push(`/${roomId}/login`);
      return;
    }

    socket.on('ROOM_STATE', roomState => {
      setUsers(roomState.users);
    });

    socket.on('QUIT_ROOM', () => {
      console.log('Facilitator disconnected.');
      history.push('/');
    });

    if (!facilitator) {
      socket.on('START_VOTE', () => {
        history.push(`/${roomId}/vote`);
      });
    }
    return () => {
      socket.removeAllListeners();
    };
  }, [socket, setUsers, history, roomId, name, facilitator]);

  const startVote = () => {
    socket.emit('START_VOTE', roomId);
  };

  return (
    <CenteredPage>
      <span>{window.location.href}</span>
      <Users />
      {facilitator && <Button onClick={startVote}>Start vote</Button>}
    </CenteredPage>
  );
});
