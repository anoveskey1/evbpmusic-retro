import { Given, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import "dotenv/config";

let browser: Browser;
let page: Page;

Given("the user navigates to the {string} page", async (pageName: string) => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto(`${process.env.VITE_EVBP_MUSIC_BASE_URL}/${pageName}`);
});

Then(
  "the user should see a page header that reads {string}",
  async (headerText: string) => {
    const header = await page.$(`h1:has-text("${headerText}")`);

    if (!header) {
      throw new Error(`Header with text "${headerText}" not found`);
    }

    const headerContent = await header.textContent();

    if (headerContent !== headerText) {
      throw new Error(
        `Expected header text "${headerText}", but found "${headerContent}"`,
      );
    }
  },
);
