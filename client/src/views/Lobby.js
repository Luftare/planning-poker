import React, { useEffect, useGlobal } from 'reactn';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { theme } from '../styles';
import { CenteredPage } from '../components/Page';
import { Button, SmallButton } from '../components/Button';
import Users from '../components/Users';
import Title from '../components/Title';
import CopyLink from '../components/CopyLink';
import { TextInput } from '../components/TextInput';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default withRouter(props => {
  const { socket, history } = props;
  const { roomId } = props.match.params;

  const [name] = useGlobal('name');
  const [, setVoting] = useGlobal('voting');
  const [stateRoomId] = useGlobal('roomId');
  const isInRoom = !!stateRoomId;
  const [facilitator] = useGlobal('facilitator');
  const [currentVoteTopic, setCurrentVoteTopic] = useGlobal('currentVoteTopic');
  const [nextVoteTopic, setNextVoteTopic] = useGlobal('nextVoteTopic');
  const [, setUsers] = useGlobal('users');

  useEffect(() => {
    if (!isInRoom && !facilitator) {
      history.push(`/${roomId}/login`);
      return;
    }

    socket.on('ROOM_STATE', roomState => {
      setUsers(roomState.users);
      setVoting(roomState.voting);
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
    setVoting,
    setCurrentVoteTopic,
    history,
    roomId,
    isInRoom,
    name,
    facilitator,
  ]);

  const removeUser = user => {
    socket.emit('KICK_USER', user.id);
  };

  const voteAgain = () => {
    socket.emit('START_VOTE', currentVoteTopic, (err, roomState) => {
      if (err) {
        console.log(err);
      } else {
        setNextVoteTopic('');
        setUsers(roomState.users);
      }
    });
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
      <Link
        to={`/${roomId}/qr`}
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          color: theme.colors.grey,
        }}
      >
        QR
      </Link>
      <Header>
        <CopyLink>{window.location.href}</CopyLink>
        {facilitator && (
          <TextInput
            placeholder="Topic (optional)"
            value={nextVoteTopic}
            onChange={e => setNextVoteTopic(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && startVote()}
            style={{ display: 'block', marginTop: '32px' }}
          />
        )}
        {currentVoteTopic && (
          <>
            <Title style={{ margin: '32px 0' }}>
              <span style={{ marginRight: facilitator ? '8px' : 0 }}>
                {currentVoteTopic}
              </span>
              {facilitator && (
                <SmallButton onClick={voteAgain}>vote again</SmallButton>
              )}
            </Title>
          </>
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
