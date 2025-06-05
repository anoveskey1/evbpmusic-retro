import {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

setDefaultTimeout(60 * 1000);

let page, browser;

Before(async function () {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
});

Given("I am on the homepage", async () => {
  await page.goto(process.env.VITE_EVBP_MUSIC_BASE_URL);
});

Then("the header should be {string}", async (expectedTitle) => {
  const header = await page.locator("h1");
  const headerContent = await header.textContent();

  expect(headerContent).toContain(expectedTitle);
});

Then("I should see a link to the {string} page", async (expectedLinkText) => {
  const link = await page.getByRole("link", { name: expectedLinkText });

  expect(link).toBeDefined();
});

Then(
  "the footer should contain the text {string}",
  async (expectedFooterText) => {
    const footer = await page.locator("footer");

    expect(await footer.textContent()).toContain(expectedFooterText);
  },
);

When("I click on the {string} link", async (expectedLinkText) => {
  const link = await page.getByRole("link", { name: expectedLinkText });

  await link.click();
});

Then("I should be redirected to the {string} page", async (expectedPage) => {
  await page.waitForURL(`**/${expectedPage}`);
  await expect(page).toHaveURL(`http://localhost:5173/${expectedPage}`);
});

After(async function () {
  await browser.close();
});
