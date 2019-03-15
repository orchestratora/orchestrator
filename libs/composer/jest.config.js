module.exports = {
  displayName: 'composer',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/composer',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
