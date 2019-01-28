module.exports = {
  moduleNameMapper: {
    '@orchestrator/gen-io-ts': '<rootDir>/node_modules/@orchestrator/gen-io-ts',
    '@orchestrator/(.*)': '<rootDir>/libs/$1/src/public_api.ts',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
