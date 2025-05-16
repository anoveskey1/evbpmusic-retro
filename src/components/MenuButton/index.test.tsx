import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import MenuButton from "./index";

const mockOnClick = jest.fn();

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

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

  it("should call the navigate function when clicked and a value for 'to' is provided", () => {
    render(
      <MemoryRouter>
        <MenuButton to={"/some-url"} text="Click me!" />
      </MemoryRouter>,
    );
    screen.getByText("Click me!").click();
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/some-url");
  });

  it("should have the correct aria-label for a link", () => {
    render(
      <MemoryRouter>
        <MenuButton
          ariaLabel="click here to go to some url"
          to={"/some-url"}
          text="Click me!"
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "aria-label",
      "click here to go to some url link",
    );
  });

  it("should have the correct aria-label for a button", () => {
    render(
      <MemoryRouter>
        <MenuButton onClick={mockOnClick} text="Click me!" />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Click me! button",
    );
  });

  it("should render an icon when a value is provided for one", () => {
    render(
      <MemoryRouter>
        <MenuButton
          ariaLabel="click here to go to some url"
          icon={<svg role="img"></svg>}
          to={"/some-url"}
          text="Click me!"
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
