import React, { useGlobal } from 'reactn';
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`
  width: calc(100% - 32px);
  max-width: 500px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 8px;
`;

export default ({ onSelect, ...rest }) => {
  const [deckIndex] = useGlobal('deckIndex');
  const [decks] = useGlobal('decks');
  const deck = decks[deckIndex];

  return (
    <Container {...rest}>
      {deck.cards.map(option => (
        <Card key={option} label={option} onClick={() => onSelect(option)} />
      ))}
    </Container>
  );
};
