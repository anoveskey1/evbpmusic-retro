/* eslint-disable */

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths ?? {}),
  modulePaths: [`${compilerOptions.baseUrl}\src`],  // compilerOptions.baseUrl
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testEnvironment: "jsdom",
  transform: {
    ".+\\.(css|less|sass|scss|png|jpg|gif|ttf|woff|woff2|svg)$":
        "jest-transform-stub",
  },
};