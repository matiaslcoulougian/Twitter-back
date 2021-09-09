const config = require('./jest.config');

module.exports = {
  ...config,
  testMatch: ['<rootDir>/src/**/__tests__/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.integration.ts']
}
