import { defineConfig, devices } from "@playwright/test";

const baseURL = `http://127.0.0.1:${process.env.PORT ?? 3000}`;

export default defineConfig({
  testDir: ".",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [["list"], ["html", { open: "never", outputFolder: "../playwright-report" }]],
  outputDir: "../test-results",
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: { command: "npm start", cwd: "..", url: baseURL, reuseExistingServer: !process.env.CI, timeout: 30000 },
});

