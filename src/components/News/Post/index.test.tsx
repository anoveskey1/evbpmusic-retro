import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Post from "./index";

describe("News Post", () => {
  it("should render the Post component without error", () => {
    const props = {
      body: "This is a test body",
      date: new Date("2023-10-01"),
      header: "Test Header",
      images: ["https://example.com/image1.jpg"],
      metaTags: ["tag1", "tag2"],
      slug: "test-header",
    };

    render(<Post {...props} />);

    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("This is a test body")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
  });
});
