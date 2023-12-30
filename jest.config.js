module.exports = {
  // Preprocessor for JavaScript and JSX files
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFiles: ["./jest.setup.js"], // Add the path to your setup file

  // or use setupFilesAfterEnv
  setupFilesAfterEnv: ["./jest.setup.js"], // Add the path to your setup file

  // Test environment
  testEnvironment: "jsdom",

  // Optional: Coverage reporting
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
};
