import React, { useGlobal } from 'reactn';
import { withRouter } from 'react-router-dom';
import { CenteredPage } from '../components/Page';
import Cards from '../components/Cards';
import Title from '../components/Title';

export default withRouter(props => {
  const [roomId] = useGlobal('roomId');
  const [, setUsers] = useGlobal('users');
  const [currentVoteTopic] = useGlobal('currentVoteTopic');

  const handleCardSelection = vote => {
    props.socket.emit('VOTE', { vote, roomId }, (err, roomState) => {
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
        Vote{currentVoteTopic && `: ${currentVoteTopic}`}
      </Title>
      <Cards onSelect={handleCardSelection} />
    </CenteredPage>
  );
});
