import { Before, Then, When } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";

let page, browser;

Before(async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
});

Then("I should see the main navigation menu", async () => {
  const navigationContainer = await page.locator("role:navigation");

  expect(navigationContainer).toBeDefined();
});
