import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsFeed from "./index";
import { HelmetProvider } from "react-helmet-async";

describe("NewsFeed", () => {
  it("should render the NewsFeed component without error", () => {
    const props = {
      newsPosts: [
        {
          body: "This is news",
          date: "2023-10-01",
          header: "First News Header",
          images: [],
          metaTags: [5, 6],
          slug: "first-news",
        },
        {
          body: "Here is Some More News",
          date: "2023-10-01",
          header: "Second News Header",
          images: [],
          metaTags: [10, 11],
          slug: "second-news",
        },
      ],
    };

    render(
      <HelmetProvider>
        <NewsFeed {...props} />
      </HelmetProvider>,
    );

    const posts = screen.getAllByRole("article");
    expect(posts).toHaveLength(props.newsPosts.length);
  });

  it("should render the NewsFeed component without error when newsPosts are unavailable", () => {
    const props = {
      newsPosts: [],
    };

    render(
      <HelmetProvider>
        <NewsFeed {...props} />
      </HelmetProvider>,
    );

    expect(screen.getByText("No news posts available.")).toBeInTheDocument();
  });
});
