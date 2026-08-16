import { parseSaved, SAVE_REJECT_REASONS } from '../CloserGame';
import { CONTENT_VERSION, runFingerprintFor } from '../../../constants/closer';

/*
 * Refactoring roadmap phase 3: parseSaved() now returns
 * { ok, value | reason } instead of a bare null that hides why a save was
 * rejected. These unit tests verify each reason directly; the E2E suite
 * separately checks the resulting fallback behavior.
 */
const BASE = {
  stateVersion: 1,
  contentVersion: CONTENT_VERSION,
  phase: 'q',
  qIndex: 5,
  pending: 5,
  hasStarted: true,
};

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
