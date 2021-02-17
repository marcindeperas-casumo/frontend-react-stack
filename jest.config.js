const brand = process.env.APP_BRAND;

module.exports = {
  globals: {
    __DEV__: true,
  },
  setupFilesAfterEnv: [
    "<rootDir>/config/jest/enzyme.js",
    "<rootDir>/config/jest/matchMedia.js",
    "<rootDir>/config/jest/mutationObserverMock.js",
  ],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/(index|types).js",
    "!src/**/*.(stories|types).js",
    "!src/**/types/**",
  ],
  coverageDirectory: "./coverage/",
  coverageReporters: ["lcov", "html", "text"],
  setupFiles: [
    "react-app-polyfill/jsdom",
    "<rootDir>/config/jest/localStorageMock.js",
  ],
  testMatch: ["**/*.test.js"],
  testEnvironment: "jsdom",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
    "^.+\\.(gql|graphql)$": "jest-transform-graphql",
    "^(?!.*\\.(js|jsx|mjs|json|gql|graphql)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.svg$": "<rootDir>/__mocks__/svgr.js",
    "^.+\\.module\\.(sass|scss)$": "identity-obj-proxy",
  },
  moduleFileExtensions: [
    `${brand}.js`,
    "js",
    `${brand}.json`,
    "json",
    `${brand}.jsx`,
    "jsx",
    `${brand}.mjs`,
    "mjs",
  ],
  restoreMocks: true,
};
