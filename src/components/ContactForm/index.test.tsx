import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactForm from "./index";

describe("ContactForm", () => {
  it("should render the contact form", () => {
    render(<ContactForm />);
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
});
