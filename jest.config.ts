import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '.*\\.spec\\.ts$',
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.ts'],
};

export default config;
