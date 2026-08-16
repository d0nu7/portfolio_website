import React from 'react';

import { Choice } from './CloserStyles';

/*
 * Die Karten-Liste hinter den Setup-Screens PACK, DURATION und MODE
 * (Refactoringplan Phase 4).
 *
 * Alle drei zeigen dieselbe Form: eine Reihe auswaehlbarer Karten mit
 * Titel, Meta und Blurb. Extrahiert wird bewusst nur diese Liste, nicht
 * der ganze Screen -- jeder der drei Screens hat einen eigenen
 * `onClick`-Uebergang (PACK setzt Route und Style gleich mit, DURATION
 * hat zusaetzlich einen Timer-Toggle, MODE zeigt eine Route-Zeile davor)
 * und einen eigenen Continue-Zielzustand. Diese Entscheidungen bleiben in
 * CloserGame.js -- der Plan warnt ausdruecklich davor, Flowlogik in
 * Praesentationskomponenten zu verteilen.
 */
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
