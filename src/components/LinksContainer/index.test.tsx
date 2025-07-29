import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LinksContainer from "./index";

const mockLinks = [
  {
    content: '<a href="https://example.com">Example Link</a>',
    name: "Example-Link",
  },
  {
    content:
      'Here is <a href="https://another-example.com">Another Example</a> of a link!',
    name: "Another-Example",
  },
];

describe("LinksContainer", () => {
  it("should render without crashing", () => {
    render(<LinksContainer header="Awesome Links" links={mockLinks} />);

    const headerElement = screen.getByRole("heading", {
      name: "Awesome Links",
    });
    const listElements = screen.getAllByRole("listitem");
    const paragraphElements = screen.getAllByRole("paragraph");
    const linkElements = screen.getAllByRole("link");

    expect(headerElement).toBeInTheDocument();
    expect(linkElements).toHaveLength(2);
    expect(listElements).toHaveLength(2);

    expect(linkElements[0]).toHaveTextContent("Example Link");
    expect(paragraphElements[0]).toHaveTextContent("Example Link");
    expect(paragraphElements[1]).toHaveTextContent(
      "Here is Another Example of a link!",
    );
  });
});
