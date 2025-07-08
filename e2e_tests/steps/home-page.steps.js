import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

setDefaultTimeout(60 * 1000);

Given("I am on the homepage", async function () {
  await this.page.goto(process.env.VITE_EVBP_MUSIC_BASE_URL);
});

Then("the header should be {string}", async function (expectedTitle) {
  const header = await this.page.locator("h1");
  const headerContent = await header.textContent();

  expect(headerContent).toContain(expectedTitle);
});

Then(
  "I should see a link to the {string} page",
  async function (expectedLinkText) {
    const link = await this.page.getByRole("link", { name: expectedLinkText });

    expect(link).toBeDefined();
  },
);

Then(
  "the footer should contain the text {string}",
  async function (expectedFooterText) {
    const footer = await this.page.locator("footer");
    const footerContent = await footer.textContent();
    const normalizedFooter = footerContent.replace(/\s|\u00A0/g, " ");

    const pattern = expectedFooterText
      .replace("#", "\\d+\\s*")
      .replace(".", "\\.");

    const regex = new RegExp(pattern);
    expect(normalizedFooter).toMatch(regex);
  },
);

When("I click on the {string} link", async function (expectedLinkText) {
  const link = await this.page.getByRole("link", { name: expectedLinkText });

  await link.click();
});

Then(
  "I should be redirected to the {string} page",
  async function (expectedPage) {
    await this.page.waitForURL(`**/${expectedPage}`);
    await expect(this.page).toHaveURL(`http://localhost:5173/${expectedPage}`);
  },
);
