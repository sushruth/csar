/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  coverageDirectory: "coverage",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.types.ts"],
  clearMocks: true,
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testEnvironment: "jsdom"
};
