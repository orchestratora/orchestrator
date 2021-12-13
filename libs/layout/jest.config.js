module.exports = {
  displayName: 'layout',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/layout',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
