import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsFeed from "./index";

describe("NewsFeed", () => {
  it("should render the NewsFeed component without error", () => {
    const props = {
      newsPosts: [
        {
          body: "This is news",
          date: new Date("2023-10-01"),
          header: "First News Header",
          images: ["https://example.com/image1.jpg"],
          metaTags: ["tag1", "tag2"],
          slug: "first-news",
        },
        {
          body: "Here is Some More News",
          date: new Date("2023-10-01"),
          header: "Second News Header",
          images: ["https://example.com/image2.jpg"],
          metaTags: ["tag3", "tag4"],
          slug: "second-news",
        },
      ],
    };

    render(<NewsFeed {...props} />);

    expect(screen.getByLabelText("News Feed")).toBeInTheDocument();
    expect(screen.getByText("First News Header")).toBeInTheDocument();
    expect(screen.getByText("This is news")).toBeInTheDocument();

    expect(screen.getByText("Second News Header")).toBeInTheDocument();
    expect(screen.getByText("Here is Some More News")).toBeInTheDocument();
  });

  it("should render the NewsFeed component without error when newsPosts are unavailable", () => {
    const props = {
      newsPosts: [],
    };

    render(<NewsFeed {...props} />);

    expect(screen.getByText("No news posts available.")).toBeInTheDocument();
  });
});
