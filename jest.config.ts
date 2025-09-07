import type { Config } from "jest";
const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/main.tsx", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: { lines: 80, statements: 80, branches: 70, functions: 80 },
  },
};
export default config;
