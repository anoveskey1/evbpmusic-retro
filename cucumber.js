import dotenv from "dotenv";

dotenv.config();

export default {
  default: {
    format: ["json:reports/cucumber.json"],
    parallel: 2,
    paths: ["e2e_tests/features/**/*.feature"],
    import: ["e2e_tests/step_definitions/**/*.ts", "e2e_tests/support/**/*.ts"],
    importModule: ["ts-node/esm"],
    worldParameters: {
      baseURL: process.env.BASE_URL || "http://localhost:5173",
      browser: process.env.BROWSER || "chromium",
      headless: process.env.HEADLESS === "true",
    },
  },
};
