import React, { useEffect, useGlobal } from 'reactn';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { CenteredPage } from '../components/Page';
import { Button } from '../components/Button';
import Users from '../components/Users';
import Title from '../components/Title';
import CopyLink from '../components/CopyLink';
import { TextInput } from '../components/TextInput';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default withRouter(props => {
  const { socket, history } = props;
  const { roomId } = props.match.params;

  const [name] = useGlobal('name');
  const [facilitator] = useGlobal('facilitator');
  const [currentVoteTopic, setCurrentVoteTopic] = useGlobal('currentVoteTopic');
  const [nextVoteTopic, setNextVoteTopic] = useGlobal('nextVoteTopic');
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

    socket.on('START_VOTE', roomState => {
      setUsers(roomState.users);
      setCurrentVoteTopic(roomState.voteTopic);

      if (!facilitator) {
        history.push(`/${roomId}/vote`);
      }
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [
    socket,
    setUsers,
    setCurrentVoteTopic,
    history,
    roomId,
    name,
    facilitator,
  ]);

  const removeUser = user => {
    socket.emit('KICK_USER', user.id);
  };

  const startVote = () => {
    socket.emit('START_VOTE', nextVoteTopic, (err, roomState) => {
      if (err) {
        console.log(err);
      } else {
        setNextVoteTopic('');
        setUsers(roomState.users);
      }
    });
  };

  return (
    <CenteredPage
      style={{
        justifyContent: facilitator ? 'space-between' : 'flex-start',
        padding: '16px',
      }}
    >
      <Header>
        <CopyLink>{window.location.href}</CopyLink>
        {facilitator && (
          <TextInput
            placeholder="Topic (optional)"
            value={nextVoteTopic}
            onChange={e => setNextVoteTopic(e.target.value)}
            style={{ fontSize: '14px', display: 'block', marginTop: '32px' }}
          />
        )}
        {currentVoteTopic && (
          <Title style={{ margin: '16px 0' }}>Voting: {currentVoteTopic}</Title>
        )}
      </Header>
      <Users
        style={{ marginTop: facilitator ? 0 : '32px' }}
        onRemoveUser={facilitator && (user => removeUser(user))}
      />
      {facilitator && <Button onClick={startVote}>Start vote</Button>}
    </CenteredPage>
  );
});
