import React, { useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { Button } from '../components/Button';
import { OptionGroup } from '../components/OptionGroup';
import { CenteredPage } from '../components/Page';

export default withRouter(props => {
  const { socket, history } = props;
  const [deckIndex, setDeckIndex] = useGlobal('deckIndex');
  const [, setFacilitator] = useGlobal('facilitator');
  const [, setRoomId] = useGlobal('roomId');
  const [decks] = useGlobal('decks');

  const handleClick = () => {
    setFacilitator(true);

    socket.emit(
      'CREATE_ROOM',
      {
        deckIndex,
      },
      roomState => {
        setRoomId(roomState.id);
        history.push(`/${roomState.id}`);
      }
    );
  };

  return (
    <CenteredPage>
      <OptionGroup
        options={decks.map(deck => deck.label)}
        activeIndex={deckIndex}
        onChange={setDeckIndex}
      />
      <Button onClick={handleClick} style={{ marginTop: '24px' }}>
        Create room
      </Button>{' '}
    </CenteredPage>
  );
});
