/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'client'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    'client(.*)$': '<rootDir>/client$1',
    '@core(.*)$': '<rootDir>/client/core$1',
    'server(.*)$': '<rootDir>/server$1',
  },

  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
