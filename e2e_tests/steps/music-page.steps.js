import {
  After,
  Before,
  Given,
  setDefaultTimeout,
  Then,
  When,
} from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

setDefaultTimeout(60 * 1000);

const numericConversion = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
  sixth: 5,
  seventh: 6,
  eighth: 7,
  ninth: 8,
};

let page, browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
});

Given("I have navigated to the {string} page", async (pageName) => {
  await page.goto(`${process.env.VITE_EVBP_MUSIC_BASE_URL}/${pageName}`);
});

Given("I am on the {string} page", async (pageName) => {
  await page.goto(`${process.env.VITE_EVBP_MUSIC_BASE_URL}/${pageName}`);

  expect(page.url()).toEqual(
    `${process.env.VITE_EVBP_MUSIC_BASE_URL}/${pageName}`,
  );
});

Then("I should see the main page header, {string}", async (expectedTitle) => {
  const header = await page.locator("h1");
  const headerContent = await header.textContent();

  expect(headerContent).toContain(expectedTitle);
});

Then(
  "I should see page summary text that reads {string}",
  async (expectedText) => {
    const paragraph = await page.locator("p").first();
    const paragraphContent = await paragraph.textContent();

    expect(paragraphContent).toContain(expectedText);
  },
);

Then(
  "the {string} release tile will be {string}",
  async (numericOrder, releaseTitle) => {
    const releaseContainer = await page
      .locator("article")
      .nth(numericConversion[numericOrder]);
    const titleContainer = await releaseContainer.locator("h2");
    const titleContent = await titleContainer.textContent();

    expect(titleContent).toContain(releaseTitle);
  },
);

When("I see the {string} release tile", async function (releaseTitle) {
  await page.waitForSelector("article");
  const articles = await page.locator("article");

  for (let i = 0; i < (await articles.count()); i++) {
    const article = articles.nth(i);
    const titleContent = await article
      .locator("h2")
      .evaluate((node) => node.textContent.trim());

    if (titleContent.includes(releaseTitle)) {
      this.releaseArticle = article;
      break;
    }
  }

  if (!this.releaseArticle) {
    throw new Error(`Release tile with title "${releaseTitle}" not found.`);
  }

  await expect(this.releaseArticle).toBeVisible();
});

Then(
  "I should see the cover image for {string}",
  async function (releaseTitle) {
    const coverImg = this.releaseArticle.getByAltText(`${releaseTitle} cover`);

    await expect(coverImg).toBeVisible();
  },
);

Then(
  "I should see the release date as {string}",
  async function (expectedReleaseDate) {
    const releaseDate = this.releaseArticle.locator("p.release-date");

    await expect(releaseDate).toHaveText(expectedReleaseDate);
  },
);

Then(
  "I should see the album credits {string}",
  async function (expectedReleaseCredits) {
    const releaseCredits = this.releaseArticle.locator("p.credits");

    await expect(releaseCredits).toHaveText(expectedReleaseCredits);
  },
);

Then("I should see the track list", async function () {
  const trackList = this.releaseArticle.locator("ol.track-list");

  await expect(trackList).toBeVisible();
});

Then(
  "the {string} track should be {string}",
  async function (numericOrder, trackTitle) {
    const trackList = this.releaseArticle.locator("ol.track-list");
    const trackElement = await trackList
      .locator("li")
      .nth(numericConversion[numericOrder]);

    await expect(trackElement).toHaveText(trackTitle);
  },
);

When("the browser window is in {string} mode", async function (windowMode) {
  if (windowMode === "mobile") {
    await page.setViewportSize({ width: 320, height: 720 });
  } else {
    await page.setViewportSize({ width: 1024, height: 768 });
  }
});

Then(
  "I should see the show\\/hide button for the release summary",
  async function () {
    const summaryToggle = this.releaseArticle.locator("button");

    await expect(summaryToggle).toBeVisible();
  },
);

// Then("I should see a link to the {string} page", async (expectedLinkText) => {
//   const link = await page.getByRole("link", { name: expectedLinkText });
//
//   expect(link).toBeDefined();
// });

// Then(
//   "the footer should contain the text {string}",
//   async (expectedFooterText) => {
//     const footer = await page.locator("footer");
//     const footerContent = await footer.textContent();
//     const normalizedFooter = footerContent.replace(/\s|\u00A0/g, " ");
//
//     const pattern = expectedFooterText
//       .replace("#", "#\\d+\\s*")
//       .replace(".", "\\.");
//
//     const regex = new RegExp(pattern);
//     expect(normalizedFooter).toMatch(regex);
//   },
// );

// When("I click on the {string} link", async (expectedLinkText) => {
//   const link = await page.getByRole("link", { name: expectedLinkText });
//
//   await link.click();
// });

// Then("I should be redirected to the {string} page", async (expectedPage) => {
//   await page.waitForURL(`**/${expectedPage}`);
//   await expect(page).toHaveURL(`http://localhost:5173/${expectedPage}`);
// });

After(async function () {
  await browser.close();
});
