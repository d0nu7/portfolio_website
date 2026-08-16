import React from 'react';

import { Choice } from './CloserStyles';

/* Shared card list for pack, duration, and style selection screens. */
export default function CloserChoiceList({ accent, items }) {
  return (
    <>
      {items.map((item) => (
        <Choice
          key={item.id}
          $on={item.selected}
          $accent={accent}
          aria-pressed={item.selected}
          onClick={item.onSelect}
        >
          <strong>{item.title}</strong>
          <em>{item.meta}</em>
          <span>{item.blurb}</span>
        </Choice>
      ))}
    </>
  );
}
