const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src', 'test'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/test/**/*.ts'],
  testPathIgnorePatterns: ['.+.d.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  }),
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*'],
  coverageReporters: ['text', 'lcovonly', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
}
