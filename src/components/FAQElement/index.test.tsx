import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FAQElement from "./index";

describe("FAQElement", () => {
  it("should render the question and answer", () => {
    const question = "What is your name?";
    const answer = "My name is John Doe.";
    const index = 0;

    render(<FAQElement question={question} answer={answer} index={index} />);

    expect(screen.getByText((index + 1).toString())).toBeInTheDocument();
    expect(screen.getByText(question)).toBeInTheDocument();
    expect(screen.getByText(answer)).toBeInTheDocument();
  });
});
