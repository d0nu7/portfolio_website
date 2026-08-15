const nextJest = require('next/jest');

// next/jest loads .babelrc (next/babel + the styled-components SSR plugin)
// and next.config.js automatically, so this stays in sync with the real
// build instead of duplicating a second Babel/webpack config for tests.
const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // e2e/ holds Playwright specs (`npm run test:e2e`), which import their own
  // `test`/`expect` from @playwright/test -- letting Jest collect those too
  // would shadow its globals and fail outright.
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/out/', '<rootDir>/e2e/'],
};

module.exports = createJestConfig(customJestConfig);
