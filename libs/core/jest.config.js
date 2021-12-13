module.exports = {
  displayName: 'core',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/core',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
