import { render, screen, fireEvent } from '@testing-library/react';

import CloserGame from '../CloserGame';
import Theme from '../../../styles/theme';

// CloserGame's styled-components read breakpoints off the site's theme via
// ThemeProvider, same as every other page -- use the real Theme wrapper
// (see _app.js) rather than re-declaring a fake theme that could drift.
const renderGame = () =>
  render(
    <Theme>
      <CloserGame />
    </Theme>
  );

/*
 * One light smoke test, not a full playthrough -- CloserGame is a single
 * large state machine driven by lots of timers, localStorage and
 * browser-only APIs (wake lock, vibration, install prompts), which are
 * exercised manually via Playwright instead (see the repo's project
 * notes). This just confirms the component mounts cleanly and the very
 * first phase transition (start -> players) actually works, as a signal
 * that a future change hasn't broken rendering outright.
 */
describe('CloserGame smoke test', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the start screen and moves to player setup on Start', async () => {
    renderGame();

    expect(await screen.findByText('CLOSER')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Start' }));

    expect(await screen.findByText('Wer spielt?')).toBeInTheDocument();
  });
});
