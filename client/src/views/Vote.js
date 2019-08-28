import React, { useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { CenteredPage } from '../components/Page';
import Cards from '../components/Cards';
import Title from '../components/Title';

export default withRouter(props => {
  const [roomId] = useGlobal('roomId');
  const [name] = useGlobal('name');
  const [, setUsers] = useGlobal('users');

  const handleCardSelection = vote => {
    props.socket.emit('VOTE', { name, vote, roomId }, roomState => {
      setUsers(roomState.users);
      props.history.push(`/${roomState.id}`);
    });
  };

  return (
    <CenteredPage>
      <Title style={{ marginBottom: '32px' }}>Vote</Title>
      <Cards onSelect={handleCardSelection} />
    </CenteredPage>
  );
});
