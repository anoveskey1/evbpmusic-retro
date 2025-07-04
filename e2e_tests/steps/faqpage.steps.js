import { setDefaultTimeout, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

setDefaultTimeout(60 * 1000);

Then(
  "I should see the entire list of frequently asked questions",
  async function () {
    await this.page.waitForSelector("div.faq-element");
    const faqList = await this.page.locator("div.faq-element").all();

    expect(faqList).toHaveLength(14);
  },
);
