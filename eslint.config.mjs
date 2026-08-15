import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

// eslint-config-next 16 ships a native ESLint 9 flat config (an array of
// Linter.Config objects) -- no FlatCompat/legacy-shim layer needed. (An
// earlier version of this file went through FlatCompat wrapping the old
// "next/core-web-vitals" string, which crashed with a circular-JSON error;
// importing the flat config directly is what the package actually expects.)
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'e2e/**', 'playwright-report/**', 'test-results/**'],
  },
  {
    rules: {
      // eslint-config-next 16's core-web-vitals preset newly bundles
      // eslint-plugin-react-hooks v7, which adds React Compiler-oriented
      // rules well beyond what this upgrade set out to do. Both rules
      // below flag long-standing, deliberate, already-reviewed patterns
      // (setState from a mount effect reading localStorage/browser APIs,
      // in CloserGame.js/CloserInstallHint.js/ki-schulungen.js) -- fixing
      // them would mean non-trivial rewrites of tested game-state effects
      // as a side effect of a dependency bump, which is exactly the kind
      // of scope creep this upgrade was meant to avoid. Left as a
      // follow-up if/when the app is deliberately made React Compiler
      // compatible.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
    },
  },
];

export default eslintConfig;
