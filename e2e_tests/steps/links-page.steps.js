import { setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

setDefaultTimeout(60 * 1000);

Then("I should remain on the links page", async function () {
  const currentUrl = this.page.url();
  const expectedUrl = `${process.env.VITE_EVBP_MUSIC_BASE_URL}/links`;

  expect(currentUrl).toEqual(expectedUrl);
});

Then("I should see the EVBP Related links", async function () {
  const evbpRelatedLinksSection = await this.page.getByRole("list").first();
  const evbpRelatedLinksHeader = await this.page.getByRole("heading", {
    size: 2,
    name: "EVBP Related",
  });

  await expect(evbpRelatedLinksSection).toBeVisible();
  await expect(evbpRelatedLinksHeader).toBeVisible();
});

Then("I should see the links not related to EVBP", async function () {
  const evbpRelatedLinksSection = await this.page.getByRole("list").nth(1);
  const evbpRelatedLinksHeader = await this.page.getByRole("heading", {
    size: 2,
    name: "EVBP-Free Content",
  });

  await expect(evbpRelatedLinksSection).toBeVisible();
  await expect(evbpRelatedLinksHeader).toBeVisible();
});

Then("The link I clicked should open in a new tab", async function () {
  const newTabPromise = this.page.waitForEvent("popup");
  const newTab = await newTabPromise;

  await newTab.waitForLoadState();

  const totalOpenTabs = this.context.pages().length;

  expect(totalOpenTabs).toEqual(2);
});

When("I click a random link", async function () {
  await this.page.waitForSelector("a");

  const linkLocator = this.page.locator("a");
  const count = await linkLocator.count();

  const randomIndex = Math.floor(Math.random() * count);
  const randomLink = linkLocator.nth(randomIndex);

  await randomLink.click();
});
