/*
 * Kontrastregression (Refactoringplan Phase 4, Iteration-9-Code-Review:
 * TextButton/Small/MenuTrigger standen bei 2,4:1 bis 3,3:1 auf dem
 * #08090c-Hintergrund, mehrere Pack-Akzente (DEEP, LATE NIGHT) zwischen
 * 1,57:1 und 3,42:1 -- alle deutlich unter WCAG AA (4,5:1 fuer normalen
 * Text).
 *
 * Die Werte werden hier NICHT gegen einen hartkodierten "sieht richtig
 * aus"-Schnappschuss geprueft, sondern die tatsaechliche WCAG-Formel wird
 * unabhaengig auf die echten Quellwerte angewendet -- MUTED_TEXT_ALPHA aus
 * CloserStyles.js und jeder actStyle.accent aus jedem Pack, LATE NIGHT
 * eingeschlossen, obwohl es nicht registriert ist (dieselbe Farbe wird
 * trotzdem verwendet, sobald der Pack einmal freigegeben wird -- siehe
 * closer-refactoring-deferred-items in den Projekt-Memories). Senkt jemand
 * einen dieser Werte spaeter wieder ab -- oder fuegt ein neuer Pack einen
 * zu dunklen Akzent hinzu -- faellt dieser Test, ohne dass jemand die
 * Zahl von Hand nachrechnen muss.
 */
import { CLOSER_BG, CLOSER_FG, MUTED_TEXT_ALPHA } from '../../components/Closer/CloserStyles';
import { PACKS, LATE_NIGHT_PACK } from '../../closer/content';

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}
function luminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map(srgbToLinear);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function contrastRatio(rgb1, rgb2) {
  const L1 = luminance(rgb1);
  const L2 = luminance(rgb2);
  const [light, dark] = L1 > L2 ? [L1, L2] : [L2, L1];
  return (light + 0.05) / (dark + 0.05);
}
function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function blend(alpha, fg, bg) {
  return fg.map((c, i) => alpha * c + (1 - alpha) * bg[i]);
}

const WCAG_AA_NORMAL_TEXT = 4.5;
const bgRgb = hexToRgb(CLOSER_BG);

describe('WCAG-Kontrast gedaempfter Textfarben (CLOSER)', () => {
  it('MUTED_TEXT_ALPHA (Small/TextButton/MenuTrigger/InstallDismiss) erreicht mindestens 4,5:1', () => {
    const ratio = contrastRatio(blend(MUTED_TEXT_ALPHA, CLOSER_FG, bgRgb), bgRgb);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });

  // Die alte Regression: bei den vorherigen Werten (0.30-0.38) haette dieser
  // Test durchfallen muessen. Haelt fest, dass die Pruefung selbst
  // tatsaechlich diskriminiert und nicht triviell immer bestuende.
  it('ein Alpha unter der Schwelle wuerde tatsaechlich durchfallen (Gegenprobe der Pruefmethode)', () => {
    const ratio = contrastRatio(blend(0.32, CLOSER_FG, bgRgb), bgRgb);
    expect(ratio).toBeLessThan(WCAG_AA_NORMAL_TEXT);
  });

  /*
   * Jeder actStyle.accent jedes Packs (TurnName/ActTitle/Kicker zeigen ihn
   * direkt als Textfarbe) -- nicht nur DEEP Akt III, das bei der ersten
   * Kontraste-Runde als einziges namentlich im Plan stand. Ein Fehlschlag
   * hier nennt Pack und Akt direkt, statt dass jemand von Hand elf
   * Packs durchrechnen muss.
   */
  const allPacks = { ...PACKS, 'late-night': LATE_NIGHT_PACK };
  Object.entries(allPacks).forEach(([packId, pack]) => {
    pack.actStyle.forEach((style, actIdx) => {
      it(`${packId} Akt ${actIdx + 1} (${style.accent}) erreicht mindestens 4,5:1`, () => {
        const ratio = contrastRatio(hexToRgb(style.accent), bgRgb);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
      });
    });
  });

  /*
   * Der neue :focus-visible-Ring (rgba(242, 243, 245, 0.85) auf #08090c)
   * ist kein Text, sondern eine UI-Komponente -- WCAG 1.4.11 verlangt hier
   * nur 3:1, nicht 4,5:1. Trotzdem geprueft, damit ein spaeter
   * abgesenkter Wert nicht unbemerkt unter selbst diese Schwelle faellt.
   */
  it('der :focus-visible-Ring erreicht mindestens 3:1 (WCAG 1.4.11, Nicht-Text)', () => {
    const ratio = contrastRatio(blend(0.85, CLOSER_FG, bgRgb), bgRgb);
    expect(ratio).toBeGreaterThanOrEqual(3);
  });
});
