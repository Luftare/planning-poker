import React, { useGlobal } from 'reactn';
import { FaTimes } from 'react-icons/fa';
import DeckSelector from './DeckSelector';
import Title from './Title';
import Column from './Column';
import { Button } from './Button';
import Users from './Users';
import FormLabel from './FormLabel';
import { CenteredPage } from './Page';
import { theme } from '../styles';

export default ({
  onRemoveUser,
  onAssignToFacilitator,
  onLeaveRoom,
  ...rest
}) => {
  const [, setShowMenu] = useGlobal('showMenu');
  const [facilitator] = useGlobal('facilitator');

  return (
    <CenteredPage {...rest}>
      <Column>
        <Title style={{ justifyContent: 'space-between' }}>
          <span>Menu</span>
          <FaTimes
            onClick={() => setShowMenu(false)}
            style={{ cursor: 'pointer' }}
            color={theme.colors.grey}
          />
        </Title>
        {facilitator && (
          <>
            <FormLabel>Users</FormLabel>
            <Users
              style={{
                marginBottom: '32px',
              }}
              editMode
              onRemoveUser={onRemoveUser}
              onAssignToFacilitator={onAssignToFacilitator}
              showControls
              facilitator
            />
            <FormLabel>Deck type</FormLabel>
            <DeckSelector />
          </>
        )}
        <Button onClick={onLeaveRoom} style={{ marginTop: '16px' }}>
          Leave room
        </Button>
      </Column>
    </CenteredPage>
  );
};
