import React, { useGlobal, useEffect } from 'reactn';
import { withRouter } from 'react-router-dom';
import { CenteredPage } from '../components/Page';
import Cards from '../components/Cards';
import Title from '../components/Title';

export default withRouter(props => {
  const { socket, history } = props;
  const { roomId } = props.match.params;
  const [name] = useGlobal('name');
  const [, setVoting] = useGlobal('voting');
  const [facilitator, setFacilitator] = useGlobal('facilitator');
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

    socket.on('ROOM_STATE', roomState => {
      setUsers(roomState.users);
      setVoting(roomState.voting);
      const self = roomState.users.find(u => u.id === socket.id);
      const selfIsFacilitator = self && self.facilitator;
      setFacilitator(selfIsFacilitator);
      console.log('voting:', roomState.voting);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, [
    history,
    socket,
    name,
    setUsers,
    setVoting,
    setFacilitator,
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
        setVoting(roomState.voting);
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
