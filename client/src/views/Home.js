import React, { useState, useGlobal } from 'reactn';
import { withRouter, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { CenteredPage } from '../components/Page';
import Title from '../components/Title';
import Column from '../components/Column';
import TextInput from '../components/TextInput';
import { theme } from '../styles';

export default withRouter(props => {
  const [roomInput, setRoomInput] = useState('');
  const [, setError] = useGlobal('error');

  const handleJoin = e => {
    e.preventDefault();

    const isUrl = roomInput.split('/').length > 1;

    if (isUrl) {
      window.location.href = roomInput;
    } else {
      setError('');
      props.socket.emit('DOES_ROOM_EXIST', roomInput, (err, exists) => {
        if (exists) {
          props.history.push(`/room/${roomInput}/login`);
        } else {
          setError('Room not found.');
        }
      });
    }
  };

  return (
    <CenteredPage>
      <Column>
        <Title>Join existing room</Title>
        <form onSubmit={handleJoin}>
          <TextInput
            placeholder={'Room name or url'}
            value={roomInput}
            onChange={e => setRoomInput(e.target.value)}
            inlineContent={
              <Button type="submit" disabled={!roomInput}>
                Join
              </Button>
            }
          />
        </form>
        <div
          style={{
            color: theme.colors.grey,
            fontSize: '18px',
            marginTop: '32px',
            marginBottom: '16px',
          }}
        >
          or
        </div>
        <Title>
          <Link
            to="/create"
            style={{ marginRight: '4px', color: theme.colors.primary }}
          >
            Create a new room
          </Link>
        </Title>
      </Column>
    </CenteredPage>
  );
});
