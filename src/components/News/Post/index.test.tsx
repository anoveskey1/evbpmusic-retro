import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
import Post from "./index";

let mockProps = {
  body: "<p>This is a test body</p>",
  date: "2023-10-01",
  header: "Test Header",
  images: [
    {
      alt: "Test Image",
      asset: {
        _ref: "image-12345",
        _type: "sanity.imageAsset",
      },
      customClass: "test-class",
    },
  ],
  metaTags: [20, 5],
  slug: "test-header",
};

describe("News Post", () => {
  it("should render the Post component without error", () => {
    const mockPropsWithBodyImage = {
      ...mockProps,
      body: `<p>This is a test body [[image:0]]</p>`,
    };

    render(
      <HelmetProvider>
        <Post {...mockPropsWithBodyImage} />
      </HelmetProvider>,
    );

    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("This is a test body")).toBeInTheDocument();
    expect(screen.getByText("A E S T H E T I C")).toBeInTheDocument();
    expect(screen.getByText("Vaporwave")).toBeInTheDocument();

    const processedBody = screen.getByRole("paragraph");
    expect(processedBody.querySelectorAll("img")).toHaveLength(1);
    expect(processedBody.querySelector("img")).toHaveAttribute(
      "src",
      "https://mocked.cdn/image.jpg",
    );
    expect(processedBody.querySelector("img")).toHaveAttribute(
      "alt",
      "Test Image",
    );
    expect(processedBody.querySelector("img")).toHaveClass("test-class");
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
