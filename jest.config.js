module.exports = {
  moduleNameMapper: {
    '@orchestrator/(.*)': '<rootDir>/libs/$1/src/public_api.ts',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
