module.exports = {
  displayName: 'ui-web',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/ui-web',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
