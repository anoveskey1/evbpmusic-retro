import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import MenuButton from "./index";

const mockOnClick = jest.fn();

describe("MenuButton", () => {
  it("should render the button with the correct text", () => {
    render(
      <MemoryRouter>
        <MenuButton onClick={mockOnClick} text="Click me!" />
      </MemoryRouter>,
    );
    expect(screen.getByText("Click me!")).toBeInTheDocument();
  });

  it("should call the onClick function when clicked", () => {
    render(
      <MemoryRouter>
        <MenuButton onClick={mockOnClick} text="Click me!" />
      </MemoryRouter>,
    );
    screen.getByText("Click me!").click();
    expect(mockOnClick).toHaveBeenCalled();
  });
});
