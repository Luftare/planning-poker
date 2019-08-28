import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import User from './User';

const Container = styled.div``;

export default props => {
  const [users] = useGlobal('users');
  const hideVotes = users.some(user => !user.voted);

  return (
    <Container {...props}>
      {users.map(user => (
        <User
          key={user.name}
          name={user.name}
          vote={user.vote}
          hideVote={hideVotes}
        />
      ))}
    </Container>
  );
};
