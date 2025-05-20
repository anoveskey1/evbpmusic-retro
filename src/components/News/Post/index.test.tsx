import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Post from "./index";

describe("News Post", () => {
  it("should render the Post component without error", () => {
    const props = {
      body: "This is a test body",
      date: "2023-10-01",
      header: "Test Header",
      images: ["https://example.com/image1.jpg"],
      metaTags: [20, 5],
      slug: "test-header",
    };

    render(<Post {...props} />);

    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("This is a test body")).toBeInTheDocument();
    expect(screen.getByText("A E S T H E T I C")).toBeInTheDocument();
    expect(screen.getByText("Vaporwave")).toBeInTheDocument();
  });
});
