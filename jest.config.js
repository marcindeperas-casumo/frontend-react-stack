const brand = process.env.APP_BRAND;

module.exports = {
  globals: {
    __DEV__: true,
  },
  preset: "ts-jest",
  setupFilesAfterEnv: [
    "<rootDir>/config/jest/enzyme.js",
    "<rootDir>/config/jest/matchMedia.js",
    "<rootDir>/config/jest/mutationObserverMock.js",
  ],
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/**/(index|types).ts",
    "!src/**/*.(stories|types).ts",
    "!src/**/*.(stories|types).tsx",
    "!src/**/types/**",
  ],
  coverageDirectory: "./coverage/",
  coverageReporters: ["lcov", "html", "text"],
  setupFiles: [
    "react-app-polyfill/jsdom",
    "<rootDir>/config/jest/localStorageMock.js",
  ],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  testEnvironment: "jsdom",
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
    "^.+\\.(gql|graphql)$": "jest-transform-graphql",
    "^(?!.*\\.(js|jsx|ts|tsx|mjs|json|gql|graphql)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$",
  ],
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
    `${brand}.ts`,
    "ts",
    `${brand}.tsx`,
    "tsx",
    `${brand}.mjs`,
    "mjs",
  ],
  restoreMocks: true,
};
