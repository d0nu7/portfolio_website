import React from 'react';

import { Body, Button, Foot, Kicker, Lede } from './CloserStyles';

/*
 * Shared handoff presentation for consent gates and private questions.
 * It deliberately owns no phase or transition logic.
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
