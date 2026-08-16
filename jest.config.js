const nextJest = require('next/jest');

// next/jest loads next.config.js and the framework transforms automatically,
// so tests stay in sync with the build without a second compiler config.
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
