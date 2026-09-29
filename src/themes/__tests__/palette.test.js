import petrolSignature from '../palettes/petrolSignature';
import { ACTIVE, cssVariables } from '../palette';

// WCAG 2.x relative luminance / contrast ratio.
const channel = (c) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const luminance = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe('site palette', () => {
  test('the live site uses Petrol Signature', () => {
    expect(ACTIVE).toBe(petrolSignature);
  });

  test('emits kebab-case custom properties, digits included', () => {
    const css = cssVariables(petrolSignature);
    expect(css).toContain('--c-surface-2: #16303A;');
    expect(css).toContain('--c-accent-soft: #9BE3E7;');
    expect(css).toContain('--fill-cta-front: linear-gradient(');
  });

  const { colors } = petrolSignature;
  test.each([
    ['text on background', colors.text, colors.bg, 4.5],
    ['accent on background', colors.accent, colors.bg, 4.5],
    ['button text on accent', colors.onAccent, colors.accent, 4.5],
    ['button text on magenta end', colors.onAccent, colors.accent2, 3],
    ['accent on light panel', colors.lightAccent, colors.lightPanel, 4.5],
    ['link on light panel', colors.lightLink, colors.lightPanel, 4.5],
  ])('%s meets WCAG (%s on %s)', (_, fg, bg, min) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(min);
  });
});
