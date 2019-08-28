import React, { useEffect, useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { CenteredPage } from '../components/Page';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';

export default withRouter(props => {
  const { socket, history } = props;
  const { roomId } = props.match.params;
  const [name, setName] = useGlobal('name');
  const [, setDeckIndex] = useGlobal('deckIndex');
  const [, setUsers] = useGlobal('users');
  const [, setRoomId] = useGlobal('roomId');

  useEffect(() => {
    socket.emit('DOES_ROOM_EXIST', roomId, exists => {
      if (!exists) {
        console.log('Room does not exist.');
        history.push(`/`);
      }
    });
  }, [socket, roomId, history]);

  const handleLogin = e => {
    e.preventDefault();

    socket.emit('JOIN_ROOM', { id: roomId, name }, (err, roomState) => {
      if (err) {
        console.log(err);
        history.push(`/`);
      } else {
        setDeckIndex(roomState.deckIndex);
        setUsers(roomState.users);
        setRoomId(roomState.id);
        history.push(`/${roomState.id}`);
      }
    });
  };

  return (
    <CenteredPage>
      <form onSubmit={handleLogin} style={{ display: 'flex' }}>
        <TextInput
          onChange={e => setName(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <Button type="submit">Join</Button>
      </form>
    </CenteredPage>
  );
});
