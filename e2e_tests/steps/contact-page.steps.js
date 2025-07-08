import { setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

setDefaultTimeout(60 * 1000);

Then("I should see the contact form", async function () {
  await this.page.waitForSelector("form");

  const contactForm = await this.page.locator("form");

  await expect(contactForm).toBeVisible();
});

Then("I see the contact form", async function () {
  await this.page.waitForSelector("form");

  const contactForm = await this.page.locator("form");

  await expect(contactForm).toBeVisible();
});

When("I fill in the email field with {string}", async function (emailAddress) {
  await this.page.getByLabel("Email").fill(emailAddress);
});

When(
  "I select {string} from the subject menu",
  async function (dropdownSubject) {
    await this.page.getByLabel("Subject").selectOption(dropdownSubject);
  },
);

When("I enter the message {string}", async function (message) {
  await this.page.getByLabel("Message").fill(message);
});

Then(
  "I should see an alert that says {string} after clicking {string}",
  async function (message, buttonName) {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toEqual("alert");
      expect(dialog.message()).toEqual(message);
    });

    const button = await this.page.getByRole("button", { name: buttonName });

    await this.page.route(
      `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/send-email`,
      async (route) => {
        const json = { status: 200 };

        await route.fulfill({ json });
      },
    );

    await button.click();
  },
);
