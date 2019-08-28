import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import User from './User';

const Container = styled.div`
  display: grid;
  grid-gap: 8px;
`;

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
          voted={user.voted}
          hideVote={hideVotes}
        />
      ))}
    </Container>
  );
};
