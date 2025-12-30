import { defineConfig, devices } from '@playwright/test';
import generateCustomLayoutAsync from "./my_custom_layout";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  timeout: 100 * 10000, 
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 3,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    [
       "./node_modules/playwright-slack-report/dist/src/SlackReporter.js",
      {
        SLACK_BOT_USER_OAUTH_TOKEN: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
        channels: ['test-reporter'],
        successChannel: ['test-reporter'],
        layoutAsync: generateCustomLayoutAsync,
        attachFiles: true,
        attachHtmlReport: true,
        showInThread: true,
      },
    ],
    ['html'],
  ],

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://kingbillycasino.com',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'on',
    video: 'retain-on-failure',
    
    /* Increase timeouts for VPN operations */
    navigationTimeout: 30000,
    actionTimeout: 15000,
  
    /* Visual regression: allow larger differences before failing */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],  },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
