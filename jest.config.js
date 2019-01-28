module.exports = {
  moduleNameMapper: {
    '@testing': '<rootDir>/libs/core/testing/src/public_api.ts',
    '@orchestrator/gen-io-ts': '<rootDir>/node_modules/@orchestrator/gen-io-ts',
    '@orchestrator/(.*)': '<rootDir>/libs/$1/src/public_api.ts',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
