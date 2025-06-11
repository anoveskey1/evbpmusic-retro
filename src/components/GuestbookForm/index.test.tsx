import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import GuestbookForm from "./index";

const mockHandleValidateEmail = (responseOk: boolean) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: responseOk,
      json: () => Promise.resolve({ message: "mock validation code sent" }),
    }),
  ) as jest.Mock;
};

window.alert = jest.fn();

describe("GuestbookForm", () => {
  it("renders correctly (pre-email validation)", () => {
    render(<GuestbookForm />);

    expect(
      screen.getByRole("form", { name: "guestbook-form" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "guestbook-input-username" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "guestbook-input-email" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: "guestbook-input-message" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", {
        name: "guestbook-input-validation-code",
      }),
    ).not.toBeInTheDocument();
  });

  it("should call the api/send-validation-code-to-email endpoint with username and email field values", async () => {
    render(<GuestbookForm />);
    mockHandleValidateEmail(true);

    const usernameInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "guestbook-input-username",
    });
    const emailInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "guestbook-input-email",
    });

    fireEvent.change(usernameInput, { target: { value: "Mock Username" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@test.com" } });

    expect(usernameInput.value).toBe("Mock Username");
    expect(emailInput.value).toBe("johndoe@test.com");

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/send-validation-code-to-email`,
        expect.objectContaining({
          body: JSON.stringify({
            username: "Mock_Username",
            email: "johndoe@test.com",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }),
      );
    });
  });

  it('should display the validation code field after a successful call to the "api/send-validation-code-to-email" endpoint', async () => {
    render(<GuestbookForm />);
    mockHandleValidateEmail(true);

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      const validationCodeInput = screen.getByRole("textbox", {
        name: "guestbook-input-validation-code",
      });
      expect(validationCodeInput).toBeInTheDocument();
    });
  });

  it("should throw an error if call to api/send-validation-code-to-email is unsuccessful", async () => {
    render(<GuestbookForm />);
    mockHandleValidateEmail(false);

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Failed to send validation code. Please try again later.",
      );
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
