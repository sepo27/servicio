/** @type {import('jest').Config} */

const config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { tsconfig: './tsconfig.jest.json' },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  injectGlobals: true,
  testMatch: ['**/*.spec.ts'],
  setupFilesAfterEnv: ['jest-extended/all'],
};

export default config;
