import React from 'react';

import { Body, Button, Foot, Kicker, Lede } from './CloserStyles';

/*
 * Der Uebergabe-Screen (Refactoringplan Phase 4, Zielarchitektur
 * components/HandoffScreen.js).
 *
 * CLOSER reicht das Handy an sechs Stellen weiter: vor beiden
 * Consent-Gates, bei der Erfassung der privaten Frage, beim privaten
 * Check danach und jeweils beim Zurueckgeben. Alle sechs hatten dieselbe
 * Form -- zentrierter Kicker, optionaler erklaerender Satz, ein einzelner
 * Button -- und waren sechsmal getippt.
 *
 * Bewusst rein praesentational: die Komponente kennt keine Phase und
 * entscheidet keinen Uebergang. Was als Naechstes passiert, bleibt im
 * Flow von CloserGame.js, wo es hingehoert -- der Plan warnt ausdruecklich
 * davor, Flowlogik in Praesentationskomponenten zu verteilen.
 */
export default function CloserHandoff({ accent, kicker, body, action, onAction }) {
  return (
    <>
      <Body $center>
        <Kicker $accent={accent}>{kicker}</Kicker>
        {body ? <Lede>{body}</Lede> : null}
      </Body>
      <Foot>
        <Button $accent={accent} onClick={onAction}>
          {action}
        </Button>
      </Foot>
    </>
  );
}
