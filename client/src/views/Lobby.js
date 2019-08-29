import React, { useEffect, useState, useGlobal } from 'reactn';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { FaQrcode, FaCog, FaRedoAlt } from 'react-icons/fa';
import { theme } from '../styles';
import { CenteredPage } from '../components/Page';
import { Button } from '../components/Button';
import Users from '../components/Users';
import Title from '../components/Title';
import CopyLink from '../components/CopyLink';
import { TextInput } from '../components/TextInput';
import DeckSelector from '../components/DeckSelector';

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
  const [deckIndex, setDeckIndex] = useGlobal('deckIndex');
  const isInRoom = !!stateRoomId;
  const [facilitator, setFacilitator] = useGlobal('facilitator');
  const [currentVoteTopic, setCurrentVoteTopic] = useGlobal('currentVoteTopic');
  const [nextVoteTopic, setNextVoteTopic] = useGlobal('nextVoteTopic');
  const [, setUsers] = useGlobal('users');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!isInRoom && !facilitator) {
      history.push(`/${roomId}/login`);
      return;
    }

    socket.on('ROOM_STATE', roomState => {
      setUsers(roomState.users);
      setVoting(roomState.voting);
      setDeckIndex(roomState.deckIndex);

      const self = roomState.users.find(u => u.id === socket.id);
      const facilitator = self && self.facilitator;
      setFacilitator(facilitator);
    });

    socket.on('QUIT_ROOM', () => {
      console.log('Disconnected from room.');
      history.push('/');
    });

    socket.on('START_VOTE', roomState => {
      setUsers(roomState.users);
      setCurrentVoteTopic(roomState.voteTopic);
      setDeckIndex(roomState.deckIndex);
      const self = roomState.users.find(u => u.id === socket.id);
      const facilitator = self && self.facilitator;
      setFacilitator(facilitator);

      if (!facilitator) {
        history.push(`/${roomId}/vote`);
      }
    });
    return () => {
      socket.removeAllListeners();
    };
    // eslint-disable-next-line
  }, []);

  const removeUser = user => {
    socket.emit('KICK_USER', user.id);
  };

  const assignUserToFacilitator = user => {
    socket.emit('ASSIGN_USER_TO_FACILITATOR', user.id);
    setEditMode(false);

    if (!name) {
      history.push(`/${roomId}/login`);
    }
  };

  const voteAgain = () => {
    socket.emit(
      'START_VOTE',
      { voteTopic: currentVoteTopic, deckIndex },
      (err, roomState) => {
        if (err) {
          console.log(err);
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
          console.log(err);
        } else {
          setNextVoteTopic('');
          setUsers(roomState.users);
        }
      }
    );
  };

  const votingControls = (
    <form style={{ display: 'flex' }} onSubmit={startVote}>
      <TextInput
        placeholder="New topic (optional)"
        value={nextVoteTopic}
        onChange={e => setNextVoteTopic(e.target.value)}
        style={{ marginRight: '8px' }}
      />
      <Button type="submit">Vote</Button>
    </form>
  );

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
        <FaQrcode size="18px" />
      </Link>

      {facilitator && (
        <FaCog
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            cursor: 'pointer',
          }}
          size="18px"
          onClick={() => setEditMode(!editMode)}
          color={editMode ? theme.colors.primary : theme.colors.grey}
        />
      )}
      <Header>
        <CopyLink>{window.location.href}</CopyLink>

        {currentVoteTopic && (
          <>
            <Title style={{ margin: '32px 0' }}>
              <span style={{ marginRight: facilitator ? '8px' : 0 }}>
                {currentVoteTopic}
              </span>
              {facilitator && (
                <FaRedoAlt
                  onClick={voteAgain}
                  size="18px"
                  color={theme.colors.grey}
                  style={{ cursor: 'pointer' }}
                >
                  vote again
                </FaRedoAlt>
              )}
            </Title>
          </>
        )}
      </Header>
      <Users
        style={{ marginTop: facilitator ? 0 : '32px' }}
        editMode={editMode}
        onRemoveUser={user => removeUser(user)}
        onAssignToFacilitator={user => assignUserToFacilitator(user)}
        showControls={editMode}
        facilitator={facilitator}
      />
      {facilitator && editMode && (
        <DeckSelector style={{ marginTop: '64px' }} />
      )}
      {facilitator && !editMode && votingControls}
    </CenteredPage>
  );
});
