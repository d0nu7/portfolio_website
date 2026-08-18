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

  // Iteration 7, Phase 2: the setup flow gained a new Duration/route step
  // between player setup and mode selection; iteration 8 (FR8-03) added a
  // Pack step before that. Confirm the full players -> pack -> duration ->
  // mode sequence actually renders, not just that closer.js's data resolves.
  it('moves from player setup through pack and duration to mode', async () => {
    renderGame();

    fireEvent.click(await screen.findByRole('button', { name: 'Start' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Weiter' }));

    expect(await screen.findByText('Welches Pack?')).toBeInTheDocument();
    expect(screen.getByText('CLASSIC')).toBeInTheDocument();
    expect(screen.getByText('FRIENDS')).toBeInTheDocument();
    expect(screen.queryByText('FIRST DATE')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Weiter' }));

    expect(await screen.findByText('Wie viel Zeit habt ihr?')).toBeInTheDocument();
    expect(screen.getByText('Quick · CLOSER-Auszug')).toBeInTheDocument();
    expect(screen.getByText('Standard · CLOSER-Auszug')).toBeInTheDocument();
    expect(screen.getByText('Full · vollständige 36-Fragen-Abfolge')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Weiter' }));

    expect(await screen.findByText('Modus wählen')).toBeInTheDocument();
  });
});
