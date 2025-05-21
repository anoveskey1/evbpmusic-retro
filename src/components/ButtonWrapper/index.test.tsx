import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ButtonWrapper from "./index";

const mockOnClick = jest.fn();

describe("ButtonWrapper", () => {
  it("should render with the correct text", () => {
    render(<ButtonWrapper onClick={mockOnClick} text="Click me!" />);
    expect(screen.getByText("Click me!")).toBeInTheDocument();
  });

  it("should call the onClick function when clicked", () => {
    render(<ButtonWrapper onClick={mockOnClick} text="Click me!" />);
    screen.getByText("Click me!").click();
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("should render an icon when a value is provided for one", () => {
    render(
      <ButtonWrapper
        onClick={mockOnClick}
        text="Click me!"
        icon={<svg role="img"></svg>}
      />,
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
