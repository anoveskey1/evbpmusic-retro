import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
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
  tenth: 9,
  eleventh: 10,
  twelfth: 11,
  thirteenth: 12,
  fourteenth: 13,
};

Given("I have navigated to the {string} page", async function (pageName) {
  await this.page.goto(`${process.env.VITE_EVBP_MUSIC_BASE_URL}/${pageName}`);
});

Given("I am on the {string} page", async function (pageName) {
  await this.page.goto(`${process.env.VITE_EVBP_MUSIC_BASE_URL}/${pageName}`);

  expect(this.page.url()).toEqual(
    `${process.env.VITE_EVBP_MUSIC_BASE_URL}/${pageName}`,
  );
});

Then(
  "I should see the main page header, {string}",
  async function (expectedTitle) {
    const header = await this.page.locator("h1");
    const headerContent = await header.textContent();

    expect(headerContent).toContain(expectedTitle);
  },
);

Then(
  "I should see page summary text that reads {string}",
  async function (expectedText) {
    const paragraph = await this.page.locator("p").first();
    const paragraphContent = await paragraph.textContent();

    expect(paragraphContent).toContain(expectedText);
  },
);

Then(
  "the {string} release tile will be {string}",
  async function (numericOrder, releaseTitle) {
    const releaseContainer = await this.page
      .locator("article")
      .nth(numericConversion[numericOrder]);
    const titleContainer = await releaseContainer.locator("h2");
    const titleContent = await titleContainer.textContent();

    expect(titleContent).toEqual(releaseTitle);
  },
);

When("I see the {string} release tile", async function (releaseTitle) {
  await this.page.waitForSelector("article");
  const articles = await this.page.locator("article");

  for (let i = 0; i < (await articles.count()); i++) {
    const article = articles.nth(i);
    const titleContent = await article
      .locator("h2")
      .evaluate((node) => node.textContent.trim());

    if (titleContent === releaseTitle) {
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

Then(
  /^I should (not )?see the (view|hide) summary button$/,
  async function (negation, action) {
    const summaryToggle =
      action === "view"
        ? this.releaseArticle.locator("button", { name: /view summary/i })
        : this.releaseArticle.locator("button", { name: /hide summary/i });

    if (negation) {
      await expect(summaryToggle).not.toBeVisible();
    } else {
      await expect(summaryToggle).toBeVisible();
    }
  },
);

When(/^I click the (view|hide) summary button$/, async function (action) {
  const summaryToggle =
    action === "view"
      ? this.releaseArticle.locator("button", { name: /view summary/i })
      : this.releaseArticle.locator("button", { name: /hide summary/i });

  await summaryToggle.click();
});

When(
  /^I click on the (apple music|bandcamp|spotify|youtube) link$/,
  async function (linkType) {
    const externalMusicLink = this.releaseArticle.getByText(linkType).first();

    await externalMusicLink.click();
  },
);

Then(
  /^I should be redirected to the (apple music|bandcamp|spotify|youtube) release page for "(.*)"$/,
  async function (linkType, releaseTitle) {
    const getLinkTypeDomain = () => {
      switch (linkType) {
        case "apple music":
          return "https://music.apple.com/us/album/";
        case "bandcamp":
          return "https://evbp.bandcamp.com/album/";
        case "youtube":
          return "https://youtube.com/";
        default:
          return "/";
      }
    };

    const getReleaseTitleSlug = () => {
      if (releaseTitle.toLowerCase() === "パラメータの特定のセット") {
        return "-";
      }

      return releaseTitle.toLowerCase().replace(/\s+/g, "-");
    };

    expect(this.page.url()).toEqual(
      `${getLinkTypeDomain()}${getReleaseTitleSlug()}`,
    );
  },
);

Then("I should no longer see the summary text", async function () {
  const summaryText = this.releaseArticle.locator("div.summary>p");

  await expect(summaryText).not.toBeVisible();
});

Then(
  "I should see the summary text that reads {string}",
  async function (expectedSummary) {
    const summaryText = this.releaseArticle.locator("div.summary>p");

    await expect(summaryText).toHaveText(expectedSummary);
  },
);

Then("the summary should read {string}", async function (expectedSummary) {
  const summaryText = this.releaseArticle.locator("div.summary>p");

  await expect(summaryText).toHaveText(expectedSummary);
});
