import React, { useGlobal } from 'reactn';
import { OptionGroup } from './OptionGroup';
import { theme } from '../styles';

export default ({ props }) => {
  const [deckIndex, setDeckIndex] = useGlobal('deckIndex');
  const [decks] = useGlobal('decks');

  return (
    <OptionGroup
      options={decks.map(deck => ({
        value: deck.label,
        label: (
          <span>
            <span>{deck.label}</span>
            <span
              style={{
                marginLeft: '8px',
                color: theme.colors.grey,
                fontSize: '12px',
              }}
            >
              {deck.cards.filter((_, i) => i < 5).join(', ')}
              ...
            </span>
          </span>
        ),
      }))}
      activeIndex={deckIndex}
      onChange={setDeckIndex}
      {...props}
    />
  );
};
