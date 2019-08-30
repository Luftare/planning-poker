import React, { useEffect, useGlobal, useState } from 'reactn';
import { withRouter } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import { throttle } from 'lodash';
import { CenteredPage } from '../components/Page';
import TextInput from '../components/TextInput';
import Title from '../components/Title';
import { Button } from '../components/Button';
import { theme } from '../styles';

let isUserNameAvailable;

export default withRouter(props => {
  const { socket, history } = props;
  const { roomId } = props.match.params;
  const [name, setName] = useGlobal('name');
  const [, setError] = useGlobal('error');
  const [, setVoting] = useGlobal('voting');
  const [, setDeckIndex] = useGlobal('deckIndex');
  const [, setUsers] = useGlobal('users');
  const [, setRoomId] = useGlobal('roomId');
  const [, setCurrentVoteTopic] = useGlobal('currentVoteTopic');
  const [userNameIsAvailable, setUserNameIsAvailable] = useState(true);

  useEffect(() => {
    const id = roomId || '';
    socket.emit('DOES_ROOM_EXIST', id, (err, exists) => {
      if (!exists) {
        setError('Room not found.');
        history.push('/');
      }
    });

    isUserNameAvailable = throttle(name => {
      socket.emit(
        'DOES_NAME_EXIST_IN_ROOM',
        { roomId, name },
        (err, exists) => {
          setUserNameIsAvailable(!exists);
        }
      );
    }, 700);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    window.localStorage.setItem('voter-name', name);

    joinRoom();
  };

  const joinRoom = () => {
    socket.emit('JOIN_ROOM', { id: roomId, name }, (err, roomState) => {
      if (err) {
        setError(err);
      } else {
        setDeckIndex(roomState.deckIndex);
        setUsers(roomState.users);
        setRoomId(roomState.id);
        setCurrentVoteTopic(roomState.voteTopic);
        setVoting(roomState.voting);

        if (roomState.voting) {
          history.push(`/${roomState.id}/vote`);
        } else {
          history.push(`/${roomState.id}`);
        }
      }
    });
  };

  return (
    <CenteredPage>
      <Title style={{ marginBottom: '32px' }}>
        <FaComments style={{ marginRight: '12px' }} color={theme.colors.grey} />{' '}
        {roomId}
      </Title>
      <form onSubmit={handleSubmit} style={{}}>
        <TextInput
          placeholder="Name"
          value={name}
          onChange={e => {
            isUserNameAvailable(e.target.value);
            setName(e.target.value);
          }}
          verifySuccess
          label="Name"
          error={!userNameIsAvailable && 'name reserved.'}
          inlineContent={<Button type="submit">Join</Button>}
        />
      </form>
    </CenteredPage>
  );
});
