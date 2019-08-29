import React, { useGlobal, useEffect, useState } from 'reactn';
import { withRouter } from 'react-router-dom';
import { Button } from '../components/Button';
import { CenteredPage } from '../components/Page';
import Title from '../components/Title';
import DeckSelector from '../components/DeckSelector';
import { TextInput } from '../components/TextInput';
import FormLabel from '../components/FormLabel';

export default withRouter(props => {
  const { socket, history } = props;
  const { roomId } = props.match.params;
  const [deckIndex] = useGlobal('deckIndex');
  const [, setFacilitator] = useGlobal('facilitator');
  const [, setRoomId] = useGlobal('roomId');
  const [, setError] = useGlobal('setError');
  const [name, setName] = useGlobal('name');
  const [, setUsers] = useGlobal('users');
  const [newRoomId, setNewRoomId] = useState('');

  useEffect(() => {
    if (roomId) {
      setNewRoomId(roomId);
    }

    socket.emit('REQUEST_NEW_ROOM_ID', (err, id) => {
      if (err) {
        console.log(err);
      } else {
        setNewRoomId(id);
      }
    });

    return () => {
      socket.removeAllListeners();
    };
    // eslint-disable-next-line
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    setFacilitator(true);

    socket.emit(
      'CREATE_ROOM',
      {
        deckIndex,
        roomId: newRoomId,
        facilitatorName: name,
      },
      (err, roomState) => {
        if (err) {
          setError(err);
          history.push(`/${roomId}/login`);
        } else {
          setRoomId(roomState.id);
          setUsers(roomState.users);
          history.push(`/${roomState.id}`);
        }
      }
    );
  };

  return (
    <CenteredPage>
      <div>
        <Title>Create room</Title>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'block', maxWidth: '300px', marginTop: '24px' }}
        >
          <FormLabel>Deck type</FormLabel>
          <DeckSelector />
          <FormLabel>Room id</FormLabel>
          <TextInput
            placeholder="Room id"
            value={newRoomId}
            onChange={e => setNewRoomId(e.target.value)}
          />
          <FormLabel>Name</FormLabel>
          <TextInput
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button
            type="submit"
            style={{ marginTop: '16px', float: 'right' }}
            disabled={!name || !newRoomId}
          >
            Create
          </Button>
        </form>
      </div>
    </CenteredPage>
  );
});
