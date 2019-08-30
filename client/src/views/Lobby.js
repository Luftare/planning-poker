import React, { useEffect, useGlobal } from 'reactn';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import { FaQrcode, FaCog, FaRedoAlt } from 'react-icons/fa';
import { theme } from '../styles';
import FacilitatorMenu from '../components/FacilitatorMenu';
import { CenteredPage } from '../components/Page';
import { Button } from '../components/Button';
import Users from '../components/Users';
import Title from '../components/Title';
import CopyLink from '../components/CopyLink';
import TextInput from '../components/TextInput';
import Column from '../components/Column';

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
      history.push(`/${roomId}/login`);
      return;
    }

    socket.emit('DOES_ROOM_EXIST', roomId, (err, exists) => {
      if (exists) {
        if (!name) {
          history.push(`/${roomId}/login`);
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

  if (showMenu) {
    return (
      <FacilitatorMenu
        onRemoveUser={user => removeUser(user)}
        onAssignToFacilitator={user => assignUserToFacilitator(user)}
      />
    );
  }

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
          onClick={() => setShowMenu(true)}
          color={theme.colors.grey}
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
      <Column>
        <Users
          style={{
            marginTop: facilitator ? 0 : '32px',
          }}
          facilitator={facilitator}
        />
      </Column>
      <Column>{facilitator && votingControls}</Column>
    </CenteredPage>
  );
});
