import React, { useGlobal } from 'reactn';
import { OptionGroup } from './OptionGroup';

export default ({ props }) => {
  const [deckIndex, setDeckIndex] = useGlobal('deckIndex');
  const [decks] = useGlobal('decks');

  return (
    <OptionGroup
      options={decks.map(deck => deck.label)}
      activeIndex={deckIndex}
      onChange={setDeckIndex}
      {...props}
    />
  );
};
