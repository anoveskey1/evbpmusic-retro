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

Given(
  "I have filled in the {string} and {string} fields with the values {string} and {string}",
  async function (fieldName1, fieldName2, fieldValue1, fieldValue2) {
    const inputInformation = [
      {
        name: fieldName1,
        value: fieldValue1,
      },
      {
        name: fieldName2,
        value: fieldValue2,
      },
    ];

    await this.page.goto(`${process.env.VITE_EVBP_MUSIC_BASE_URL}/guestbook`);

    expect(this.page.url()).toEqual(
      `${process.env.VITE_EVBP_MUSIC_BASE_URL}/guestbook`,
    );

    inputInformation.map(async (inputInfo) => {
      const inputField = await this.page.getByRole("textbox", {
        name: `guestbook-input-${inputInfo.name}`,
      });

      await inputField.fill(inputInfo.value);
    });
  },
);

Given("I have clicked the Get Validation Code button", async function () {
  await this.page.route(
    `**/api/send-validation-code-to-email`,
    async (route) => {
      const json = {
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          message:
            "A validation code has been sent to the email address you provided. Please enter it into the validation code input field to continue.",
        }),
      };

      await route.fulfill(json);
    },
  );

  this.page.once("dialog", async (dialog) => {
    expect(dialog.type()).toEqual("alert");
  });

  const button = await this.page.getByRole("button", {
    name: "Get Validation Code",
  });

  await button.click();
});

Given("I see an alert that says {string}", async function (alertMessage) {
  this.page.once("dialog", async (dialog) => {
    expect(dialog.type()).toEqual("alert");
    expect(dialog.message()).toEqual(alertMessage);

    await dialog.accept();
  });
});

Given(
  "I have filled in the validation code field with {string}",
  async function (validationCode) {
    const inputField = await this.page.getByRole("textbox", {
      name: "guestbook-input-validation-code",
    });

    await inputField.fill(validationCode);
  },
);

When(
  "I fill in the {string} field with the value {string}",
  async function (fieldName, fieldValue) {
    const inputField = await this.page.getByRole("textbox", {
      name: `guestbook-input-${fieldName}`,
    });

    await inputField.fill(fieldValue);
  },
);

Given("I click the Sign The Guestbook button", async function () {
  await this.page.route(`**/api/sign-guestbook`, async (route) => {
    const json = {
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Thanks for signing my guestbook. You rock!",
      }),
    };

    await route.fulfill(json);
  });

  this.page.on("dialog", async (dialog) => {
    expect(dialog.type()).toEqual("alert");
  });

  const button = await this.page.getByRole("button", {
    name: "Sign The Guestbook",
  });

  await button.click();
});

Given("I click the Validate User button", async function () {
  await this.page.route(`**/api/validate-user`, async (route) => {
    const json = {
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        message: "User validation successful. You can now sign the guestbook!",
        user: {
          username: "McnuggetKing97",
          email: "john.mcnugget@gmail.com",
        },
      }),
    };

    await route.fulfill(json);
  });

  this.page.on("dialog", async (dialog) => {
    expect(dialog.type()).toEqual("alert");
  });

  const button = await this.page.getByRole("button", { name: "Validate User" });

  await button.click();
});
