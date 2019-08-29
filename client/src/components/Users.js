import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import User from './User';
import Facilitator from './Facilitator';

const Container = styled.div`
  display: grid;
  grid-gap: 12px;
  width: 80%;
  max-width: 250px;
`;

export default ({
  onRemoveUser,
  onAssignToFacilitator,
  showControls,
  onToggleEdit,
  editMode,
  ...rest
}) => {
  const [users] = useGlobal('users');
  const [voting] = useGlobal('voting');
  const [facilitator] = useGlobal('facilitator');
  const voters = users.filter(u => !u.facilitator);
  const facilitatorUser = users.find(u => u.facilitator);

  return (
    <Container {...rest}>
      {facilitatorUser && !showControls && (
        <Facilitator
          name={facilitatorUser.name}
          style={{ marginBottom: '24px' }}
          onToggleEdit={onToggleEdit}
          editMode={editMode}
          showControls={showControls}
          facilitator={facilitator}
        />
      )}
      {voters.map(user => (
        <User
          key={user.name}
          name={user.name}
          vote={user.vote}
          voted={user.voted}
          hideVote={voting || !user.voted}
          showControls={facilitator && showControls}
          onRemove={() => onRemoveUser(user)}
          onAssignToFacilitator={() => onAssignToFacilitator(user)}
        />
      ))}
      {voters.length === 0 && !showControls && (
        <div style={{ textAlign: 'center' }}>Waiting for voters...</div>
      )}
    </Container>
  );
};
