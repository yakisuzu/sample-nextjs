module.exports = {
  testMatch: [
    "<rootDir>/test/**/*.spec.(ts|tsx)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^#/(.*)$": "<rootDir>/test/$1"
  },
  verbose: true,
  // https://github.com/zeit/next.js/issues/8663#issue-490553899
  globals: {
    "ts-jest": {
      "tsConfig": "<rootDir>/test/tsconfig.jest.json"
    },
  },
}
