module.exports = {
  displayName: 'stepper',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/stepper',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
