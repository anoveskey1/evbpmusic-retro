import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactForm from "./index";
import { SUBJECT_OPTIONS } from "./emailSubjectOptions";
import IContactFormProps from "./IContactFormProps";

const mockProps: IContactFormProps = {
  publicKey: "test_public_key",
  recipientEmail: "someguy@test.com",
  serviceId: "test_service_id",
  templateId: "test_template_id",
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
});
