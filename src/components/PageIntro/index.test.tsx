import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageIntro from "./index";

describe("PageIntro", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const headerText = "Welcome to the Page";
  const descriptionText = "This is a description of the page.";

  it("renders the header correctly", () => {
    render(<PageIntro header={headerText} description={descriptionText} />);

    const headerElement = screen.getByRole("heading", { name: headerText });
    expect(headerElement).toBeInTheDocument();
  });

  it("renders the description correctly", () => {
    render(<PageIntro header={headerText} description={descriptionText} />);

    const descriptionElement = screen.getByText(descriptionText);
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders correctly when no description is present", () => {
    render(<PageIntro header={headerText} />);

    const headerElement = screen.getByRole("heading", { name: headerText });
    expect(headerElement).toBeInTheDocument();

    const descriptionElement = screen.queryByRole("paragraph");
    expect(descriptionElement).not.toBeInTheDocument();
  });
});
