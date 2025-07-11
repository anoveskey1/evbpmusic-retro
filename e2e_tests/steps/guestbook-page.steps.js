import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import dotenv from "dotenv";
import { mockGuestbookEntries } from "../constants/mockGuestbookEntries.js";

dotenv.config();

setDefaultTimeout(60 * 1000);

Given("the guestbook entries API is unavailable", async function () {
  await this.page.route(`**/api/guestbook-entries`, async (route) => {
    const json = {
      status: 404,
      contentType: "application/json",
      body: JSON.stringify({
        code: "DATA_UNAVAILABLE",
        message: "No guestbook entries found.",
      }),
    };

    await route.fulfill(json);
  });
});

Given("the guestbook API returns entries", async function () {
  await this.page.route(`**/api/guestbook-entries`, async (route) => {
    const json = {
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockGuestbookEntries),
    };

    await route.fulfill(json);
  });
});

Then("I should see the guestbook entries", async function () {
  const guestbookEntriesElement = await this.page.getByRole("region", {
    name: "Guestbook Entries",
  });

  await expect(guestbookEntriesElement).toBeVisible();
});

Then("I should not see the guestbook entries", async function () {
  const guestbookEntriesElement = await this.page.getByRole("region", {
    name: "Guestbook Entries",
  });

  await expect(guestbookEntriesElement).not.toBeVisible();
});

When(
  "I fill in the {string} field with {string}",
  async function (fieldName, fieldValue) {
    const inputField = await this.page.getByRole("textbox", {
      name: `guestbook-input-${fieldName}`,
    });

    await inputField.fill(fieldValue);
  },
);

When("I click the {string} button", async function (buttonName) {
  await this.page.route(
    `**/api/send-validation-code-to-email`,
    async (route) => {
      const json = {
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message:
            "A validation code has been sent to the email address you provided.",
        }),
      };

      await route.fulfill(json);
    },
  );

  this.page.on("dialog", async (dialog) => {
    expect(dialog.type()).toEqual("alert");
  });

  const button = await this.page.getByRole("button", { name: buttonName });

  await button.click();
});
