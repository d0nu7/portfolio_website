import {
  SAVE_REJECT_REASONS,
  STATE_VERSION,
  createInitialState,
  createRestartState,
  parseSaved,
  resumeSavedState,
} from '../../../closer/engine/persistence';
import { CONTENT_VERSION, runFingerprintFor } from '../../../constants/closer';

/*
 * Refactoring roadmap phase 3: parseSaved() now returns
 * { ok, value | reason } instead of a bare null that hides why a save was
 * rejected. These unit tests verify each reason directly; the E2E suite
 * separately checks the resulting fallback behavior.
 */
const BASE = {
  stateVersion: STATE_VERSION,
  contentVersion: CONTENT_VERSION,
  phase: 'q',
  qIndex: 5,
  pending: 5,
  hasStarted: true,
  privateMomentStatus: 'not-started',
  privateQuestionState: ['unseen', 'unseen'],
  consentDecisions: [null, null],
};

describe('createInitialState', () => {
  it('creates a canonical fresh state while preserving supported preferences', () => {
    const state = createInitialState({
      lang: 'en',
      packId: 'first-date',
      routeId: 'quick',
      timerEnabled: false,
    });

    expect(state).toEqual(expect.objectContaining({
      stateVersion: STATE_VERSION,
      phase: 'start',
      lang: 'en',
      packId: 'first-date',
      routeId: 'quick',
      timerEnabled: false,
      qIndex: 0,
      pending: 0,
      completed: false,
      hasStarted: false,
      contentVersion: CONTENT_VERSION,
      runFingerprint: null,
      privateMomentStatus: 'not-started',
      privateQuestionState: ['unseen', 'unseen'],
      consentDecisions: [null, null],
    }));
  });

  it('restarts from canonical state while retaining supported session choices', () => {
    const state = createRestartState({
      lang: 'en',
      packId: 'first-date',
      routeId: 'quick',
      timerEnabled: false,
      phase: 'q',
      qIndex: 8,
      hasStarted: true,
    }, { visiblePackIds: ['first-date'] });

    expect(state).toEqual(expect.objectContaining({
      phase: 'start',
      lang: 'en',
      packId: 'first-date',
      routeId: 'quick',
      timerEnabled: false,
      qIndex: 0,
      hasStarted: false,
    }));
  });

  it('falls back from a hidden Late Night pack during restart', () => {
    const hidden = createRestartState({
      lang: 'de',
      packId: 'late-night',
      routeId: 'standard',
      timerEnabled: true,
    }, { visiblePackIds: ['classic'] });
    const visible = createRestartState({
      lang: 'de',
      packId: 'late-night',
      routeId: 'standard',
      timerEnabled: true,
    }, { visiblePackIds: ['late-night'] });

    expect(hidden.packId).toBe('classic');
    expect(visible.packId).toBe('late-night');
  });

  it('uses the first configured visible pack rather than assuming Classic is visible', () => {
    const state = createRestartState({
      lang: 'en',
      packId: 'family',
      routeId: 'quick',
      timerEnabled: true,
    }, { visiblePackIds: ['friends', 'road-trip'] });

    expect(state.packId).toBe('friends');
    expect(state.routeId).toBe('quick');
  });
});

describe('resumeSavedState', () => {
  it('restores the parsed state in the language selected on the resume screen', () => {
    const saved = { ...BASE, lang: 'de', packId: 'classic' };
    expect(resumeSavedState(saved, 'en')).toEqual({
      ...saved,
      lang: 'en',
      consentDecisions: [null, null],
    });
    expect(saved.lang).toBe('de');
  });

  it.each([
    ['secret1', 'secretPass1'],
    ['secret2', 'secretPass2'],
    ['check1', 'checkPass1'],
    ['check2', 'checkPass2'],
  ])('covers private content when resuming %s', (phase, expectedPhase) => {
    expect(resumeSavedState({ ...BASE, phase }, 'de').phase).toBe(expectedPhase);
  });

  it.each([
    ['consentGateA', 'consentGatePassA'],
    ['consentGateB', 'consentGatePassA'],
    ['consentGatePassB', 'consentGatePassA'],
    ['consentAct2A', 'consentAct2PassA'],
    ['consentAct2B', 'consentAct2PassA'],
    ['consentAct2PassB', 'consentAct2PassA'],
  ])('restarts a partial two-person consent gate from A when resuming %s', (
    phase,
    expectedPhase
  ) => {
    expect(resumeSavedState({
      ...BASE,
      phase,
      consentDecisions: ['yes', null],
    }, 'de')).toEqual(expect.objectContaining({
      phase: expectedPhase,
      consentDecisions: [null, null],
    }));
  });

  it('rejects a missing state and ignores an unsupported language', () => {
    expect(resumeSavedState(null, 'de')).toBeNull();
    expect(resumeSavedState({ ...BASE, lang: 'de' }, 'fr').lang).toBe('de');
  });
});

describe('parseSaved (discriminated save parser)', () => {
  it('rejects an empty or missing raw value with reason=EMPTY', () => {
    expect(parseSaved(null)).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.EMPTY });
    expect(parseSaved('')).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.EMPTY });
  });

  it('rejects malformed JSON with reason=INVALID_JSON instead of throwing', () => {
    expect(parseSaved('{not json')).toEqual({
      ok: false,
      reason: SAVE_REJECT_REASONS.INVALID_JSON,
    });
  });

  it('rejects an implausible shape with reason=IMPLAUSIBLE_SHAPE', () => {
    expect(parseSaved(JSON.stringify({ phase: 'not-a-real-phase' }))).toEqual({
      ok: false,
      reason: SAVE_REJECT_REASONS.IMPLAUSIBLE_SHAPE,
    });
    expect(parseSaved(JSON.stringify({ ...BASE, qIndex: '5' }))).toEqual({
      ok: false,
      reason: SAVE_REJECT_REASONS.IMPLAUSIBLE_SHAPE,
    });
  });

  /*
   * `start` is not in VALID_PHASES. It represents "no save loaded", not a
   * phase stored by a real run, so shape validation rejects it first. The
   * SETUP_PHASE branch is defensive in case `start` is added later.
   */
  it('rejects the setup-only "start" phase as IMPLAUSIBLE_SHAPE', () => {
    expect(parseSaved(JSON.stringify({ ...BASE, phase: 'start' }))).toEqual({
      ok: false,
      reason: SAVE_REJECT_REASONS.IMPLAUSIBLE_SHAPE,
    });
  });

  it('rejects a completed save with reason=COMPLETED', () => {
    expect(parseSaved(JSON.stringify({ ...BASE, completed: true }))).toEqual({
      ok: false,
      reason: SAVE_REJECT_REASONS.COMPLETED,
    });
  });

  it('rejects a setup phase without real progress with reason=NO_PROGRESS', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, phase: 'players', hasStarted: false }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.NO_PROGRESS });
  });

  it('rejects a mismatched content revision with reason=CONTENT_VERSION_MISMATCH', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, contentVersion: CONTENT_VERSION - 1 }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.CONTENT_VERSION_MISMATCH });
  });

  it('rejects a consent phase for a pack without a consent gate', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, phase: 'consentGateA', packId: 'classic' }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.CONSENT_PHASE_WITHOUT_GATE });
  });

  it('accepts a resumable Late Night entry gate without marking the run started', () => {
    const result = parseSaved(JSON.stringify({
      ...BASE,
      packId: 'late-night',
      routeId: 'standard',
      modeId: 'explicit',
      phase: 'consentGatePassB',
      hasStarted: false,
      consentDecisions: undefined,
    }));
    expect(result.ok).toBe(true);
  });

  it('rejects a stale runFingerprint with reason=CONTENT_DRIFT', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, packId: 'classic', runFingerprint: 'r0-nonsense' }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.CONTENT_DRIFT });
  });

  it('rejects a qIndex outside the route with reason=INDEX_OUT_OF_RANGE', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, packId: 'classic', qIndex: 999, pending: 999 }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.INDEX_OUT_OF_RANGE });
  });

  it('rejects a breakAct outside the valid range with reason=BREAK_ACT_OUT_OF_RANGE', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, packId: 'classic', breakAct: 5 }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.BREAK_ACT_OUT_OF_RANGE });
  });

  /*
   * BUG-008: validation checked broad shape but not whether a phase and its
   * pack/route were even reachable together. secretPass1..checkPassBack are
   * only ever entered after the engine has confirmed the route
   * is not Quick and the pack's privateMoment is not 'none' -- two
   * independent ways that precondition can fail, both traced from those
   * transitions and checked here.
   */
  it('rejects a private-moment phase on the Quick route with reason=PRIVATE_MOMENT_PHASE_UNAVAILABLE', () => {
    expect(
      parseSaved(
        JSON.stringify({ ...BASE, packId: 'classic', routeId: 'quick', phase: 'secretPass1' })
      )
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.PRIVATE_MOMENT_PHASE_UNAVAILABLE });
  });

  it("rejects a private-moment phase for a pack whose privateMoment is 'none' with reason=PRIVATE_MOMENT_PHASE_UNAVAILABLE", () => {
    expect(
      parseSaved(
        JSON.stringify({
          ...BASE,
          packId: 'late-night',
          routeId: 'standard',
          phase: 'checkPass1',
        })
      )
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.PRIVATE_MOMENT_PHASE_UNAVAILABLE });
  });

  it('accepts a private-moment phase when the pack/route combination actually supports one', () => {
    const result = parseSaved(
      JSON.stringify({ ...BASE, packId: 'classic', routeId: 'full', phase: 'secretPass1' })
    );
    expect(result.ok).toBe(true);
  });

  /*
   * BUG-008: the renewed Act II consent gate is only ever entered from the
   * 'break' screen while breakAct still holds Act I's value (0) -- nothing
   * afterward changes it before these phases render, so breakAct 1 can
   * never legitimately coexist with them.
   */
  it('rejects the Act II consent gate with a stale breakAct, reason=ACT2_CONSENT_PHASE_INVALID_BREAK_ACT', () => {
    expect(
      parseSaved(
        JSON.stringify({
          ...BASE,
          packId: 'late-night',
          routeId: 'standard',
          phase: 'consentAct2PassA',
          breakAct: 1,
        })
      )
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.ACT2_CONSENT_PHASE_INVALID_BREAK_ACT });
  });

  it('accepts the Act II consent gate with breakAct 0 for a pack that actually has a consent gate', () => {
    const result = parseSaved(
      JSON.stringify({
        ...BASE,
        packId: 'late-night',
        routeId: 'standard',
        phase: 'consentAct2PassA',
        breakAct: 0,
      })
    );
    expect(result.ok).toBe(true);
  });

  it('accepts a plausible save and returns the normalized value', () => {
    const fingerprint = runFingerprintFor('classic', 'full');
    const result = parseSaved(
      JSON.stringify({ ...BASE, packId: 'classic', routeId: 'full', runFingerprint: fingerprint })
    );
    expect(result.ok).toBe(true);
    expect(result.value.packId).toBe('classic');
    expect(result.value.qIndex).toBe(5);
    expect(result.value.hasStarted).toBe(true);
  });
});
