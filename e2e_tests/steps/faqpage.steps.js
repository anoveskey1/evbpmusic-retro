import { setDefaultTimeout, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

setDefaultTimeout(60 * 1000);

Then("I should see the frequently asked questions", async function () {
  await this.page.waitForSelector("div.faq-element");
  this.faqList = await this.page.locator("div.faq-element").all();

  expect(this.faqList.length).toBeGreaterThan(0);
});

Then(
  "I see the list of {int} frequently asked questions",
  async function (faqTotal) {
    await this.page.waitForSelector("div.faq-element");
    this.faqList = await this.page.locator("div.faq-element").all();

    expect(this.faqList).toHaveLength(faqTotal);
  },
);

Then(
  "faq #{int} should have question {string}",
  async function (faqIndex, expectedQuestionText) {
    const faqItem = await this.faqList[faqIndex - 1];
    const questionElement = faqItem.locator("h3");

    await expect(questionElement).toHaveText(expectedQuestionText);
  },
);

Then(
  "faq #{int} should have answer {string}",
  async function (faqIndex, expectedAnswerText) {
    const faqItem = await this.faqList[faqIndex - 1];
    const answerElement = faqItem.locator("p");

    await expect(answerElement).toContainText(expectedAnswerText);
  },
);
