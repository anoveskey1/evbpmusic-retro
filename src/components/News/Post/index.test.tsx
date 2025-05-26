import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
import Post from "./index";

let mockProps = {
  body: "<p>This is a test body</p>",
  date: "2023-10-01",
  header: "Test Header",
  images: ["https://example.com/image1.jpg"],
  metaTags: [20, 5],
  slug: "test-header",
};

describe("News Post", () => {
  it("should render the Post component without error", () => {
    render(
      <HelmetProvider>
        <Post {...mockProps} />
      </HelmetProvider>,
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("This is a test body")).toBeInTheDocument();
    expect(screen.getByText("A E S T H E T I C")).toBeInTheDocument();
    expect(screen.getByText("Vaporwave")).toBeInTheDocument();
  });

  it("should not contain image tags when the images property is an empty array", () => {
    const noImagesProps = {
      ...mockProps,
      images: [],
    };

    render(
      <HelmetProvider>
        <Post {...noImagesProps} />
      </HelmetProvider>,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should not contain image tags when the images property is undefined", () => {
    const noImagesProps = {
      ...mockProps,
      images: undefined,
    };

    render(<Post {...noImagesProps} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("should not render meta tags when metaTags property is an empty array", () => {
    const noImagesProps = {
      ...mockProps,
      images: [],
      metaTags: [],
    };

    render(
      <HelmetProvider>
        <Post {...noImagesProps} />
      </HelmetProvider>,
    );

    expect(screen.getByRole("contentinfo").children).toHaveLength(0);
  });

  it("should not render meta tags when metaTags property is undefined", () => {
    const noImagesProps = {
      ...mockProps,
      images: [],
      metaTags: undefined,
    };

    render(<Post {...noImagesProps} />);

    expect(screen.getByRole("contentinfo").children).toHaveLength(0);
  });

  // TODO: Add test to validate isSlugPost conditional helmet rendering
});
