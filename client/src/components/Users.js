import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import User from './User';

const Container = styled.div`
  display: grid;
  grid-gap: 12px;
  width: 80%;
  max-width: 250px;
`;

export default ({ onRemoveUser, ...rest }) => {
  const [users] = useGlobal('users');
  const [voting] = useGlobal('voting');

  return (
    <Container {...rest}>
      {users.map(user => (
        <User
          key={user.name}
          name={user.name}
          vote={user.vote}
          voted={user.voted}
          hideVote={voting || !user.voted}
          canRemove={!!onRemoveUser}
          onRemove={() => onRemoveUser(user)}
        />
      ))}
      {users.length === 0 && (
        <div style={{ textAlign: 'center' }}>Waiting for voters...</div>
      )}
    </Container>
  );
};
