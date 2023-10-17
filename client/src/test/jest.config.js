const nextJest = require('next/jest')
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('../../tsconfig.spec.json')
const paths = compilerOptions.paths || {}
// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' })

// Any custom config you want to pass to Jest
const customJestConfig = {
  rootDir: '../',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  testEnvironment: 'jest-environment-jsdom',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverage: false,
  testPathIgnorePatterns: ['<rootDir>/public/', '<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/test/'],
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**', '!<rootDir>/out/**', '!<rootDir>/.next/**', '!<rootDir>/*.config.js', '!<rootDir>/coverage/**'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transformIgnorePatterns: ['/node_modules/', '/node_modules/(?!(axios)/)'],
}

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig)
