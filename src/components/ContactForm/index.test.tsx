import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactForm from "./index";
import { SUBJECT_OPTIONS } from "./emailSubjectOptions";
import IContactForm from "../../types/IContactForm";

const mockProps: IContactForm = {
  turnstileSiteKey: "test_turnstile_key",
};

describe("ContactForm", () => {
  it("should render the contact form", () => {
    render(<ContactForm {...mockProps} />);
    const formElement = screen.getByRole("form");
    const emailInputElement = screen.getByLabelText(/email/i);
    const subjectInputElement = screen.getByLabelText(/subject/i);
    const messageInputElement = screen.getByLabelText(/message/i);
    const submitButtonElement = screen.getByRole("button", { name: /send/i });

    expect(formElement).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(subjectInputElement).toBeInTheDocument();
    expect(messageInputElement).toBeInTheDocument();
    expect(submitButtonElement).toBeInTheDocument();
  });

  it("should clear the form when the 'clear' button is pressed", async () => {
    render(<ContactForm {...mockProps} />);
    const mockFormInput = "macho macho man... I've got to be a macho man!";

    const emailInputElement = screen.getByLabelText<HTMLInputElement>(/email/i);
    const subjectInputElement =
      screen.getByLabelText<HTMLInputElement>(/subject/i);
    const messageInputElement =
      screen.getByLabelText<HTMLTextAreaElement>(/message/i);
    const clearButtonElement = screen.getByRole("button", { name: /clear/i });

    // fill the form inputs
    fireEvent.change(emailInputElement, { target: { value: mockFormInput } });
    fireEvent.change(subjectInputElement, {
      target: { value: SUBJECT_OPTIONS[2].value },
    });
    fireEvent.change(messageInputElement, { target: { value: mockFormInput } });

    expect(emailInputElement.value).toBe(mockFormInput);
    expect(subjectInputElement.value).toBe(SUBJECT_OPTIONS[2].value);
    expect(messageInputElement.value).toBe(mockFormInput);

    fireEvent.click(clearButtonElement);

    await waitFor(() => {
      expect(emailInputElement.value).toBe("");
      expect(subjectInputElement.value).toBe(SUBJECT_OPTIONS[0].value);
      expect(messageInputElement.value).toBe("");
    });
  });

  it("should show an error message if the email is invalid", async () => {
    window.alert = jest.fn();

    render(<ContactForm {...mockProps} />);
    const invalidEmail = "invalid-email";
    const mockFormInput = "macho macho man... I've got to be a macho man!";
    const emailInputElement = screen.getByLabelText<HTMLInputElement>(/email/i);
    const messageInputElement =
      screen.getByLabelText<HTMLTextAreaElement>(/message/i);
    const submitButtonElement = screen.getByRole("button", { name: /send/i });

    fireEvent.change(emailInputElement, { target: { value: invalidEmail } });
    fireEvent.change(messageInputElement, { target: { value: mockFormInput } });
    fireEvent.click(submitButtonElement);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Please enter a valid email address.",
      );
    });
  });

  it("should clear the form fields on successful submission", async () => {
    window.alert = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Email sent successfully" }),
      }),
    ) as jest.Mock;

    render(<ContactForm {...mockProps} />);
    const validEmail = "test@example.com";
    const mockFormInput = "macho macho man... I've got to be a macho man!";
    const emailInputElement = screen.getByLabelText<HTMLInputElement>(/email/i);
    const messageInputElement =
      screen.getByLabelText<HTMLTextAreaElement>(/message/i);
    const submitButtonElement = screen.getByRole("button", { name: /send/i });

    // Fill the form inputs
    fireEvent.change(emailInputElement, { target: { value: validEmail } });
    fireEvent.change(messageInputElement, { target: { value: mockFormInput } });

    // Ensure the "send" button is enabled
    expect(submitButtonElement).not.toBeDisabled();

    // Submit the form
    fireEvent.click(submitButtonElement);

    // Wait for the form to be cleared
    await waitFor(() => {
      expect(emailInputElement.value).toBe("");
      expect(messageInputElement.value).toBe("");
      expect(submitButtonElement).toBeDisabled();
    });

    // Ensure send-email endpoint was called with the correct parameters
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: validEmail,
          message: mockFormInput,
          subject: SUBJECT_OPTIONS[0].value,
        }),
      },
    );
  });
});
