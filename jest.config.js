module.exports = {
    // Preprocessor for JavaScript and JSX files
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
    },
  
    // Test environment
    testEnvironment: "jsdom",
  
    // Optional: Module mocking for CSS or image files
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/styleMock.js",
      "\\.(gif|ttf|eot|svg|png)$": "identity-obj-proxy",
    },
  
    // Optional: Coverage reporting
    collectCoverage: true,
    coverageReporters: ["lcov", "text"],
  };