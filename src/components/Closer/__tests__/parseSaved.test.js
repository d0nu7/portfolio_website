import { parseSaved, SAVE_REJECT_REASONS } from '../CloserGame';
import { CONTENT_VERSION, runFingerprintFor } from '../../../constants/closer';

/*
 * Refactoringplan Phase 3 ("versionierten Save-Parser als diskriminierte
 * Zustände implementieren"): parseSaved() gibt jetzt { ok, value | reason }
 * zurueck statt eines nackten null, das jeden Ablehnungsgrund gleich
 * aussehen liess. Diese Tests pruefen den jeweils genannten Grund direkt,
 * statt (wie resume-validation.spec.js auf E2E-Ebene) nur zu beobachten,
 * dass irgendein Fallback auf den Startscreen passiert -- praeziser und
 * ohne Playwright-Overhead.
 */
const BASE = {
  stateVersion: 1,
  contentVersion: CONTENT_VERSION,
  phase: 'q',
  qIndex: 5,
  pending: 5,
  hasStarted: true,
};

describe('parseSaved (diskriminierter Save-Parser)', () => {
  it('lehnt einen leeren/fehlenden Rohwert mit reason=EMPTY ab', () => {
    expect(parseSaved(null)).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.EMPTY });
    expect(parseSaved('')).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.EMPTY });
  });

  it('lehnt kaputtes JSON mit reason=INVALID_JSON ab, statt zu werfen', () => {
    expect(parseSaved('{not json')).toEqual({
      ok: false,
      reason: SAVE_REJECT_REASONS.INVALID_JSON,
    });
  });

  it('lehnt eine unplausible Form mit reason=IMPLAUSIBLE_SHAPE ab', () => {
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
   * 'start' steht gar nicht in VALID_PHASES (es ist der Default fuer "noch
   * kein Spielstand geladen", niemals ein Wert, den ein echter Spielstand
   * selbst traegt) -- die Formpruefung greift deshalb hier bereits vorher.
   * Der SETUP_PHASE-Zweig in parseSaved() ist defensiver Code fuer den
   * Fall, dass 'start' spaeter einmal in VALID_PHASES aufgenommen wuerde;
   * dieser Test haelt die tatsaechliche, heutige Reihenfolge fest.
   */
  it('lehnt die reine Setup-Phase "start" ab (heute schon ueber IMPLAUSIBLE_SHAPE, da "start" nicht in VALID_PHASES steht)', () => {
    expect(parseSaved(JSON.stringify({ ...BASE, phase: 'start' }))).toEqual({
      ok: false,
      reason: SAVE_REJECT_REASONS.IMPLAUSIBLE_SHAPE,
    });
  });

  it('lehnt einen abgeschlossenen Spielstand mit reason=COMPLETED ab', () => {
    expect(parseSaved(JSON.stringify({ ...BASE, completed: true }))).toEqual({
      ok: false,
      reason: SAVE_REJECT_REASONS.COMPLETED,
    });
  });

  it('lehnt eine Setup-Phase ohne echten Fortschritt mit reason=NO_PROGRESS ab', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, phase: 'players', hasStarted: false }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.NO_PROGRESS });
  });

  it('lehnt eine falsche Contentrevision mit reason=CONTENT_VERSION_MISMATCH ab', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, contentVersion: CONTENT_VERSION - 1 }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.CONTENT_VERSION_MISMATCH });
  });

  it('lehnt eine Consent-Phase fuer einen Pack ohne Consent-Gate mit reason=CONSENT_PHASE_WITHOUT_GATE ab', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, phase: 'consentGateA', packId: 'classic' }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.CONSENT_PHASE_WITHOUT_GATE });
  });

  it('lehnt einen driftenden runFingerprint mit reason=CONTENT_DRIFT ab', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, packId: 'classic', runFingerprint: 'r0-nonsense' }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.CONTENT_DRIFT });
  });

  it('lehnt einen qIndex ausserhalb der Route mit reason=INDEX_OUT_OF_RANGE ab', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, packId: 'classic', qIndex: 999, pending: 999 }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.INDEX_OUT_OF_RANGE });
  });

  it('lehnt einen breakAct ausserhalb der gueltigen Werte mit reason=BREAK_ACT_OUT_OF_RANGE ab', () => {
    expect(
      parseSaved(JSON.stringify({ ...BASE, packId: 'classic', breakAct: 5 }))
    ).toEqual({ ok: false, reason: SAVE_REJECT_REASONS.BREAK_ACT_OUT_OF_RANGE });
  });

  it('akzeptiert einen plausiblen Spielstand mit ok=true und dem gemergten Wert', () => {
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
