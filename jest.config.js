const fs = require('fs');
const path = require('path');
const root = path.join.bind(path, __dirname);

module.exports = {
  rootDir: './',
  globals: {
    QA: false,
    __TRANSFORM_HTML__: true,
    __BASE_URI__: '',
    __BOI_BACKEND_URI__: '',
    __ONBOARDING_BACKEND_URI__: '',
    'ts-jest': {
      tsConfigFile: 'src/tsconfig.spec.json',
      skipBabel: true,
    },
  },
  transform: {
    '^.+\\.(ts|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '@app/(.*)$': '<rootDir>/src/app/$1',
    '@config/(.*)$': '<rootDir>/src/config/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '@components/(.*)': '<rootDir>/src/app/components/$1',
    '@containers/(.*)': '<rootDir>/src/app/containers/$1',
    '@store/(.*)': '<rootDir>/src/app/store/$1',
    '@test/(.*)': '<rootDir>/src/app/test/$1',
    '@text-content/(.*)': '<rootDir>/src/app/text-content/$1',
    '@xenial-ux/(.*)': '<rootDir>/src/app/xenial-ux/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|moment|ag-grid-angular|@hc/xenial-ui-shared|@hc/xenial_guest_list|@hc/pos-devices-template|ngx-bootstrap)',
  ],
  testPathIgnorePatterns: ['<rootDir>/config'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/**/*.type.ts',
    '!src/**/*.module.ts',
    '!src/**/*.model.ts',
    '!src/environments/**',
    '!src/app/test/**',
    '!src/vendor.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/environment.ts',
    '!src/typings.d.ts',
    '!src/app/text-content',
    '!src/app/containers/widget-sandbox/**',
    '!src/app/shared/mock-data/**',
  ],
  coverageReporters: ['lcov', 'text-summary'],
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/config/jest/setup-jest.ts',
  testRegex: '^(?:(?!integration\\.spec\\.ts$).)*\\.spec\\.ts$',
  mapCoverage: true,
};

if (fs.existsSync(root('src/xenial-ui-shared'))) {
  module.exports.moduleNameMapper['@hc/xenial-ui-shared/(.+)'] = "<rootDir>/src/xenial-ui-shared/$1";
  module.exports.moduleNameMapper['@hc/xenial-ui-shared'] = "<rootDir>/src/xenial-ui-shared";
}
