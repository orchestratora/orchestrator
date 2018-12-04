module.exports = {
  moduleNameMapper: {
    '@orchestrator/(.*)': '<rootDir>/libs/$1/src/public_api.ts',
    '@orchestrator/(.*)/(.*)': '<rootDir>/libs/$1/$1/src/public_api.ts',
  },
};
