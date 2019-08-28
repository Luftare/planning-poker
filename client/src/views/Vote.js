import React, { useGlobal, useEffect } from 'reactn';
import { withRouter } from 'react-router-dom';
import { CenteredPage } from '../components/Page';
import Cards from '../components/Cards';
import Title from '../components/Title';

export default withRouter(props => {
  const { socket, history } = props;
  const { roomId } = props.match.params;
  const [name] = useGlobal('name');
  const [facilitator] = useGlobal('facilitator');
  const [, setUsers] = useGlobal('users');
  const [currentVoteTopic, setCurrentVoteTopic] = useGlobal('currentVoteTopic');

  useEffect(() => {
    if (!name && !facilitator) {
      history.push(`/${roomId}/login`);
      return;
    }

    socket.on('START_VOTE', roomState => {
      setCurrentVoteTopic(roomState.voteTopic);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [
    history,
    socket,
    name,
    setUsers,
    setCurrentVoteTopic,
    roomId,
    facilitator,
  ]);

  const handleCardSelection = vote => {
    props.socket.emit('VOTE', { vote }, (err, roomState) => {
      if (err) {
        console.log(err);
        props.history.push(`/`);
      } else {
        setUsers(roomState.users);
        props.history.push(`/${roomState.id}`);
      }
    });
  };

  return (
    <CenteredPage>
      <Title style={{ marginBottom: '32px' }}>
        {currentVoteTopic ? currentVoteTopic : 'Vote'}
      </Title>
      <Cards onSelect={handleCardSelection} />
    </CenteredPage>
  );
});
