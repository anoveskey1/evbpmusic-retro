import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I have navigated to the {string} page", async function (pageName) {
  await this.page.goto(`${process.env.VITE_EVBP_MUSIC_BASE_URL}/${pageName}`);
});

Given("I am on the {string} page", async function (pageName) {
  await this.page.goto(`${process.env.VITE_EVBP_MUSIC_BASE_URL}/${pageName}`);

  console.log("Current URL:", this.page.url());

  expect(this.page.url()).toEqual(
    `${process.env.VITE_EVBP_MUSIC_BASE_URL}/${pageName}`,
  );
});

Then("I should see the {string} form", async function (formName) {
  await this.page.waitForSelector("form");

  const form = await this.page.getByRole("form", { name: `${formName}-form` });

  await expect(form).toBeVisible();
});

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
