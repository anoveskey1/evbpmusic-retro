import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Then("I should see the main navigation menu", async function () {
  const navigationContainer = await this.page.locator("role:navigation");

  expect(navigationContainer).toBeDefined();
});

When("the browser window is in {string} mode", async function (windowMode) {
  if (windowMode === "mobile") {
    await this.page.setViewportSize({ width: 320, height: 720 });
  } else {
    await this.page.setViewportSize({ width: 1024, height: 768 });
  }
});

When("I go back to the previous page", async function () {
  await this.page.goBack();
});
