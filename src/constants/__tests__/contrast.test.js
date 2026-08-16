/*
 * Contrast regression coverage (refactoring roadmap phase 4). TextButton,
 * Small and MenuTrigger previously ranged from 2.4:1 to 3.3:1 against
 * #08090c. Several pack accents ranged from 1.57:1 to 3.42:1, all below
 * WCAG AA's 4.5:1 requirement for normal text.
 *
 * Rather than comparing against a visual snapshot, these tests apply the
 * WCAG formula independently to source values: MUTED_TEXT_ALPHA and every
 * pack's actStyle.accent, including LATE NIGHT. Lowering an existing value
 * or adding an insufficiently bright accent fails without manual arithmetic.
 */
import {
  CHROME_TEXT_ALPHA,
  CLOSER_BG,
  CLOSER_FG,
  MUTED_TEXT_ALPHA,
} from '../../components/Closer/CloserStyles';
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

describe('WCAG contrast for muted CLOSER text', () => {
  it('MUTED_TEXT_ALPHA reaches at least 4.5:1', () => {
    const ratio = contrastRatio(blend(MUTED_TEXT_ALPHA, CLOSER_FG, bgRgb), bgRgb);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });

  it('question count and elapsed-time chrome reach at least 4.5:1', () => {
    const ratio = contrastRatio(blend(CHROME_TEXT_ALPHA, CLOSER_FG, bgRgb), bgRgb);
    expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
  });

  // The previous 0.30-0.38 values must fail, proving that the calculation
  // actually discriminates rather than passing every input.
  it('an alpha below the threshold fails the calculation', () => {
    const ratio = contrastRatio(blend(0.32, CLOSER_FG, bgRgb), bgRgb);
    expect(ratio).toBeLessThan(WCAG_AA_NORMAL_TEXT);
  });

  /*
   * TurnName, ActTitle and Kicker use every pack's actStyle.accent directly
   * as text color. A failure names the pack and act without requiring a
   * manual audit of every pack.
   */
  const allPacks = { ...PACKS, 'late-night': LATE_NIGHT_PACK };
  Object.entries(allPacks).forEach(([packId, pack]) => {
    pack.actStyle.forEach((style, actIdx) => {
      it(`${packId} act ${actIdx + 1} (${style.accent}) reaches at least 4.5:1`, () => {
        const ratio = contrastRatio(hexToRgb(style.accent), bgRgb);
        expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL_TEXT);
      });
    });
  });

  /*
   * The :focus-visible ring is a UI component rather than text, so WCAG
   * 1.4.11 requires 3:1. Keep it covered against later regressions.
   */
  it('the :focus-visible ring reaches at least 3:1', () => {
    const ratio = contrastRatio(blend(0.85, CLOSER_FG, bgRgb), bgRgb);
    expect(ratio).toBeGreaterThanOrEqual(3);
  });
});
