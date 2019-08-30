import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { FaRedoAlt } from 'react-icons/fa';
import { theme } from '../styles';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';
import { HorizontallyCenteredPage } from '../components/Page';
import { Button } from '../components/Button';
import Users from '../components/Users';
import Title from '../components/Title';
import TextInput from '../components/TextInput';
import Column from '../components/Column';

export default withRouter(props => {
  const { socket, history } = props;
  const { roomId } = props.match.params;

  const [name] = useGlobal('name');
  const [, setError] = useGlobal('error');
  const [, setVoting] = useGlobal('voting');
  const [deckIndex, setDeckIndex] = useGlobal('deckIndex');
  const [, setInfo] = useGlobal('info');
  const [facilitator, setFacilitator] = useGlobal('facilitator');
  const [currentVoteTopic, setCurrentVoteTopic] = useGlobal('currentVoteTopic');
  const [nextVoteTopic, setNextVoteTopic] = useGlobal('nextVoteTopic');
  const [users, setUsers] = useGlobal('users');
  const [showMenu, setShowMenu] = useGlobal('showMenu');

  useEffect(() => {
    const userInRoom = users.find(u => u.id === socket.id);

    if (!userInRoom) {
      history.push(`/room/${roomId}/login`);
      return () => {
        socket.removeAllListeners();
      };
    }

    socket.emit('DOES_ROOM_EXIST', roomId, (err, exists) => {
      if (exists) {
        if (!name) {
          history.push(`/room/${roomId}/login`);
        }
      } else {
        setError('Room not found.');
        history.push('/');
      }
    });

    socket.on('ROOM_STATE', roomState => {
      setUsers(roomState.users);
      setVoting(roomState.voting);
      setDeckIndex(roomState.deckIndex);

      const self = roomState.users.find(u => u.id === socket.id);
      const selfFacilitator = self && self.facilitator;
      const becameFailitator = !facilitator && selfFacilitator;
      const delegatedFacilitator = facilitator && !selfFacilitator;

      if (becameFailitator) {
        setInfo('You are now the facilitator.');
      }

      if (delegatedFacilitator) {
        setInfo('Facilitator role delegated.');
      }

      setFacilitator(selfFacilitator);
    });

    socket.on('QUIT_ROOM', () => {
      setError('Disconnected from room.');
      setShowMenu(false);
      socket.removeAllListeners();
      history.push('/');
    });

    socket.on('START_VOTE', roomState => {
      setShowMenu(false);
      setUsers(roomState.users);
      setCurrentVoteTopic(roomState.voteTopic);
      setDeckIndex(roomState.deckIndex);
      const self = roomState.users.find(u => u.id === socket.id);
      const facilitator = self && self.facilitator;
      setFacilitator(facilitator);

      if (!facilitator) {
        history.push(`/room/${roomId}/vote`);
      }
    });
    return () => {
      socket.removeAllListeners();
    };
    // eslint-disable-next-line
  }, []);

  const removeUser = user => {
    socket.emit('KICK_USER', user.id);
    setInfo('User removed.');
  };

  const assignUserToFacilitator = user => {
    socket.emit('ASSIGN_USER_TO_FACILITATOR', user.id);
    setShowMenu(false);
  };

  const voteAgain = () => {
    socket.emit(
      'START_VOTE',
      { voteTopic: currentVoteTopic, deckIndex },
      (err, roomState) => {
        if (err) {
          setError(err);
        } else {
          setNextVoteTopic('');
          setUsers(roomState.users);
        }
      }
    );
  };

  const startVote = e => {
    e.preventDefault();

    socket.emit(
      'START_VOTE',
      { voteTopic: nextVoteTopic, deckIndex },
      (err, roomState) => {
        if (err) {
          setError(err);
        } else {
          setNextVoteTopic('');
          setUsers(roomState.users);
        }
      }
    );
  };

  const handleLeaveRoom = () => {
    socket.emit('KICK_USER', socket.id);
    socket.removeAllListeners();
    setShowMenu(false);
    history.push('/');
  };

  const votingControls = (
    <form style={{ display: 'flex' }} onSubmit={startVote}>
      <TextInput
        placeholder="optional"
        label="Topic"
        value={nextVoteTopic}
        onChange={e => setNextVoteTopic(e.target.value)}
        inlineContent={<Button type="submit">Vote</Button>}
      />
    </form>
  );

  const topicTitle = (
    <>
      <Title style={{ margin: '32px 0' }}>
        <span>{currentVoteTopic}</span>
        {facilitator && (
          <FaRedoAlt
            onClick={voteAgain}
            size="18px"
            color={theme.colors.grey}
            style={{ cursor: 'pointer', marginLeft: '8px' }}
          >
            vote again
          </FaRedoAlt>
        )}
      </Title>
    </>
  );

  if (showMenu) {
    return (
      <Menu
        onRemoveUser={user => removeUser(user)}
        onAssignToFacilitator={user => assignUserToFacilitator(user)}
        onLeaveRoom={handleLeaveRoom}
      />
    );
  }

  return (
    <HorizontallyCenteredPage>
      <NavBar />

      <Column style={{ flexGrow: 1, marginTop: '64px' }}>
        {currentVoteTopic && topicTitle}

        <Users
          style={{
            marginTop: facilitator ? 0 : '32px',
          }}
          facilitator={facilitator}
        />
      </Column>
      <Column style={{ position: 'sticky', bottom: 0 }}>
        {facilitator && votingControls}
      </Column>
    </HorizontallyCenteredPage>
  );
});
