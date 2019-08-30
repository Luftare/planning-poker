import React, { useGlobal, useEffect, useState } from 'reactn';
import { withRouter } from 'react-router-dom';
import { throttle } from 'lodash';
import { Button } from '../components/Button';
import { CenteredPage } from '../components/Page';
import Title from '../components/Title';
import Column from '../components/Column';
import DeckSelector from '../components/DeckSelector';
import TextInput from '../components/TextInput';
import FormLabel from '../components/FormLabel';

let isRoomNameAvailable;

export default withRouter(props => {
  const { socket, history } = props;
  const { roomId } = props.match.params;
  const [deckIndex] = useGlobal('deckIndex');
  const [, setRoomId] = useGlobal('roomId');
  const [, setError] = useGlobal('setError');
  const [name, setName] = useGlobal('name');
  const [, setFacilitator] = useGlobal('facilitator');
  const [, setUsers] = useGlobal('users');
  const [newRoomId, setNewRoomId] = useState('');
  const [customRoomId, setCustomRoomId] = useState('');
  const [roomNameIsAvailable, setRoomNameIsAvailable] = useState(true);

  const [currentRoomId, setCurrentRoomId] = useState('');

  useEffect(() => {
    setCurrentRoomId(customRoomId || newRoomId);
    // eslint-disable-next-line
  }, [newRoomId, customRoomId]);

  useEffect(() => {
    isRoomNameAvailable = throttle(name => {
      socket.emit('DOES_ROOM_EXIST', name, (err, exists) => {
        setRoomNameIsAvailable(!exists);
      });
    }, 700);

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
        roomId: currentRoomId,
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

  const validFormInput = roomNameIsAvailable && name && currentRoomId;

  return (
    <CenteredPage>
      <Column>
        <Title>Create room</Title>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'block', marginTop: '24px' }}
        >
          <FormLabel>Deck type</FormLabel>
          <DeckSelector />
          <TextInput
            label="Room name"
            placeholder={newRoomId}
            value={customRoomId}
            validateInput
            inputValid={roomNameIsAvailable}
            error={!roomNameIsAvailable && 'reserved.'}
            onChange={e => {
              isRoomNameAvailable(e.target.value);
              setCustomRoomId(e.target.value);
            }}
          />
          <TextInput
            label="Name"
            placeholder="Name"
            validateInput
            inputValid={!!name}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button
            type="submit"
            style={{ marginTop: '16px', float: 'right' }}
            disabled={!validFormInput}
          >
            Create
          </Button>
        </form>
      </Column>
    </CenteredPage>
  );
});
