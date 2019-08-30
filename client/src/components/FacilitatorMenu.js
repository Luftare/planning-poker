import React, { useGlobal } from 'reactn';
import { FaTimes } from 'react-icons/fa';
import DeckSelector from './DeckSelector';
import Title from './Title';
import Column from './Column';
import Users from './Users';
import FormLabel from './FormLabel';
import { CenteredPage } from './Page';
import { theme } from '../styles';

export default ({ onRemoveUser, onAssignToFacilitator, ...rest }) => {
  const [, setShowMenu] = useGlobal('showMenu');

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
      </Column>
    </CenteredPage>
  );
};