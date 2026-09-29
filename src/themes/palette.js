// Single source of truth for the site's colours (homepage + /ki-schulungen).
//
// To try another palette, point ACTIVE at a different file in ./palettes.
// Components never hard-code brand colours; they read the CSS custom
// properties generated below (var(--c-accent), var(--fill-cta-front), ...).
import petrolSignature from './palettes/petrolSignature';

export const ACTIVE = petrolSignature;

const kebab = (key) => key.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();

// Emits `--c-*` for colours and `--fill-*` for fills, e.g.
// colors.accentSoft -> --c-accent-soft, fills.ctaFront -> --fill-cta-front.
export const cssVariables = (palette = ACTIVE) => [
  ...Object.entries(palette.colors).map(([k, v]) => `--c-${kebab(k)}: ${v};`),
  ...Object.entries(palette.fills).map(([k, v]) => `--fill-${kebab(k)}: ${v};`),
].join('\n    ');

export default ACTIVE;
