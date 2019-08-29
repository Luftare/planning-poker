import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import { CenteredPage } from '../components/Page';
import { TextInput } from '../components/TextInput';
import Title from '../components/Title';
import { Button } from '../components/Button';
import { theme } from '../styles';

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

  useEffect(() => {
    const id = roomId || '';
    socket.emit('DOES_ROOM_EXIST', id, (err, exists) => {
      if (!exists) {
        setError('Room not found.');
        history.push('/');
      }
    });
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
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <TextInput
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          style={{ marginRight: '8px' }}
          value={name}
        />
        <Button type="submit">Join</Button>
      </form>
    </CenteredPage>
  );
});
