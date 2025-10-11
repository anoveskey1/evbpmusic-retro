import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import IApiError from "@typeDefs/IApiError";
import sendValidationCode from "./functions/sendValidationCode/sendValidationCode";
import signGuestbook from "./functions/signGuestbook/signGuestbook";
import validateUser from "./functions/validateUser/validateUser";
import GuestbookForm from "./index";
import ModalProvider from "@/context/ModalProvider";

jest.mock("./functions/sendValidationCode/sendValidationCode");
jest.mock("./functions/signGuestbook/signGuestbook");
jest.mock("./functions/validateUser/validateUser");

const mockSendValidationCode = sendValidationCode as jest.Mock;
const mockSignGuestbook = signGuestbook as jest.Mock;
const mockValidateUser = validateUser as jest.Mock;

const mockError: IApiError = {
  code: "MOCK_ERROR",
  message: "An unknown error occurred",
};

describe("GuestbookForm", () => {
  it("renders correctly (pre-user interaction)", () => {
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

  it('should display the validation code field after a successful call to the "api/send-validation-code-to-email" endpoint', async () => {
    render(<GuestbookForm />);
    mockSendValidationCode.mockResolvedValue(true);

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      const validationCodeInput = screen.getByLabelText("Validation Code");
      expect(validationCodeInput).toBeInTheDocument();
    });
  });

  it("should display a modal if call to api/send-validation-code-to-email returns an error object", async () => {
    render(
      <ModalProvider>
        <GuestbookForm />
      </ModalProvider>,
    );
    mockSendValidationCode.mockResolvedValue(mockError);

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "Failed to send validation code: An unknown error occurred",
      );
    });
  });

  it("should display a modal if call to api/send-validation-code-to-email returns false", async () => {
    render(
      <ModalProvider>
        <GuestbookForm />
      </ModalProvider>,
    );
    mockSendValidationCode.mockResolvedValue(false);

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "An unknown error has occurred. Please try again later.",
      );
    });
  });

  it("should display a modal if call to api/validate-user endpoint is unsuccessful", async () => {
    render(
      <ModalProvider>
        <GuestbookForm />
      </ModalProvider>,
    );
    mockSendValidationCode.mockResolvedValue(true);
    mockValidateUser.mockResolvedValue({
      code: "MOCK_ERROR",
      message: "MOCK User entry not found. Please contact the site admin.",
    });

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "Validation code sent to your email. Please check your inbox.",
      );
    });

    const validateUserButton = screen.getByRole("button", {
      name: /validate user/i,
    });
    validateUserButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "MOCK User entry not found. Please contact the site admin.",
      );
    });

    const messageInput = screen.queryByLabelText("Message");
    expect(messageInput).not.toBeInTheDocument();
  });

  it("should display the message field after a successful call to the api/validate-user endpoint", async () => {
    render(
      <ModalProvider>
        <GuestbookForm />
      </ModalProvider>,
    );
    mockSendValidationCode.mockResolvedValue(true);
    mockValidateUser.mockResolvedValue({
      status: true,
      message:
        "MOCK User validation successful. You can now sign the guestbook!",
    });

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "Validation code sent to your email. Please check your inbox.",
      );
    });

    const validateUserButton = screen.getByRole("button", {
      name: /validate user/i,
    });
    validateUserButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "MOCK User validation successful. You can now sign the guestbook!",
      );
    });

    const messageInput = screen.getByLabelText("Message");
    expect(messageInput).toBeInTheDocument();
  });

  it("should set the values of the input fields when the user types in them", async () => {
    render(
      <ModalProvider>
        <GuestbookForm />
      </ModalProvider>,
    );
    mockSendValidationCode.mockResolvedValue(true);
    mockValidateUser.mockResolvedValue({
      status: true,
      message:
        "MOCK User validation successful. You can now sign the guestbook!",
    });

    // validate username input
    const usernameInput = screen.getByRole("textbox", {
      name: "guestbook-input-username",
    });
    const username = "testuser";
    fireEvent.change(usernameInput, { target: { value: username } });
    expect(usernameInput).toHaveValue(username);

    // validate email input
    const emailInput = screen.getByRole("textbox", {
      name: "guestbook-input-email",
    });
    const mockEmail = "johndoe@mocksite.com";
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    expect(emailInput).toHaveValue(mockEmail);

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();
    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "Validation code sent to your email. Please check your inbox.",
      );
    });

    const validationCodeInput = screen.getByLabelText("Validation Code");
    const mockValidationCode = "THIS_IS_A_MOCK_VALIDATION_CODE";
    fireEvent.change(validationCodeInput, {
      target: { value: mockValidationCode },
    });
    expect(validationCodeInput).toHaveValue(mockValidationCode);

    const validateUserButton = screen.getByRole("button", {
      name: /validate user/i,
    });
    validateUserButton.click();
    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "MOCK User validation successful. You can now sign the guestbook!",
      );
    });

    // validate message input
    const messageInput = screen.getByRole("textbox", {
      name: "guestbook-input-message",
    });
    const mockMessage = "This is a test message.";
    fireEvent.change(messageInput, { target: { value: mockMessage } });
    expect(messageInput).toHaveValue(mockMessage);
  });

  it("should display a failure modal when the call to api/sign-guestbook endpoint is unsuccessful", async () => {
    render(
      <ModalProvider>
        <GuestbookForm />
      </ModalProvider>,
    );
    mockSendValidationCode.mockResolvedValue(true);
    mockValidateUser.mockResolvedValue({
      status: true,
      message:
        "MOCK User validation successful. You can now sign the guestbook!",
    });
    mockSignGuestbook.mockResolvedValue(mockError);

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "Validation code sent to your email. Please check your inbox.",
      );
    });

    const validateUserButton = screen.getByRole("button", {
      name: /validate user/i,
    });
    validateUserButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "MOCK User validation successful. You can now sign the guestbook!",
      );
    });

    const messageInput = screen.getByRole("textbox", {
      name: "guestbook-input-message",
    });
    fireEvent.change(messageInput, {
      target: { value: "This is a test message." },
    });

    const signGuestbookButton = screen.getByRole("button", {
      name: /sign the guestbook/i,
    });
    signGuestbookButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "Failed to sign guestbook: An unknown error occurred",
      );
    });
  });

  it("should display an modal telling the user to enter a message when no value is present for the message", async () => {
    render(
      <ModalProvider>
        <GuestbookForm />
      </ModalProvider>,
    );
    mockSendValidationCode.mockResolvedValue(true);
    mockValidateUser.mockResolvedValue({
      status: true,
      message:
        "MOCK User validation successful. You can now sign the guestbook!",
    });

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "Validation code sent to your email. Please check your inbox.",
      );
    });

    const validateUserButton = screen.getByRole("button", {
      name: /validate user/i,
    });
    validateUserButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      // const modalCloseButton = screen.queryByRole("button", { name: "OK" });
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "MOCK User validation successful. You can now sign the guestbook!",
      );

      // if (modalCloseButton) { modalCloseButton.click();
    });

    const signGuestbookButton = screen.getByRole("button", {
      name: /sign the guestbook/i,
    });
    act(() => signGuestbookButton.click());

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "Please enter a message to sign the guestbook.",
      );
    });
  });

  it("should display a success modal when the call to api/sign-guestbook endpoint is successful", async () => {
    render(
      <ModalProvider>
        <GuestbookForm />
      </ModalProvider>,
    );
    mockSendValidationCode.mockResolvedValue(true);
    mockValidateUser.mockResolvedValue({
      status: true,
      message:
        "MOCK User validation successful. You can now sign the guestbook!",
    });
    mockSignGuestbook.mockResolvedValue("Guestbook signed successfully!");

    const getValidationCodeButton = screen.getByRole("button", {
      name: /get validation code/i,
    });
    getValidationCodeButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "Validation code sent to your email. Please check your inbox.",
      );
    });

    const validateUserButton = screen.getByRole("button", {
      name: /validate user/i,
    });
    validateUserButton.click();

    await waitFor(() => {
      const modalElement = screen.getByRole("dialog");

      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent(
        "MOCK User validation successful. You can now sign the guestbook!",
      );

      const closeModalButton = within(modalElement).getByRole("button", {
        name: /ok/i,
      });

      act(() => closeModalButton.click());
    });

    const messageInput = screen.getByRole("textbox", {
      name: "guestbook-input-message",
    });
    fireEvent.change(messageInput, {
      target: { value: "This is a test message." },
    });

    const signGuestbookButton = screen.getByRole("button", {
      name: /sign the guestbook/i,
    });
    signGuestbookButton.click();

    expect(mockSignGuestbook).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      const modalElement = screen.queryByRole("dialog");
      expect(modalElement).toBeInTheDocument();
      expect(modalElement).toHaveTextContent("Guestbook signed successfully!");
    });

    await waitFor(() => {
      expect(
        screen.queryByRole("textbox", {
          name: "guestbook-input-validation-code",
        }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("textbox", { name: "guestbook-input-message" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("textbox", { name: "guestbook-input-username" }),
      ).toHaveValue("");
      expect(
        screen.queryByRole("textbox", { name: "guestbook-input-email" }),
      ).toHaveValue("");
    });
  });
});
