import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AlbumContainer from "./index";

describe("AlbumContainer", () => {
  const mockProps = {
    credits: "Test Artist",
    coverUrl: "./image.jpg",
    links: [
      { url: "https://example.com", title: "Example Link" },
      { url: "https://test.com", title: "Test Link" },
    ],
    releaseDate: "2023-01-01",
    title: "Test Album",
    trackList: ["Track 1", "Track 2", "Track 3"],
    type: "EP",
  };

  it("renders the album title and type", () => {
    render(<AlbumContainer {...mockProps} />);
    expect(screen.getByText(/Test Album/i)).toBeInTheDocument();
    expect(screen.getByText(/\(EP\)/i)).toBeInTheDocument();
  });

  it("renders the release date", () => {
    render(<AlbumContainer {...mockProps} />);
    expect(screen.getByText(/2023-01-01/i)).toBeInTheDocument();
  });

  it("renders the credits", () => {
    render(<AlbumContainer {...mockProps} />);
    expect(screen.getByText(/Test Artist/i)).toBeInTheDocument();
  });

  it("renders the track list", () => {
    render(<AlbumContainer {...mockProps} />);
    mockProps.trackList.forEach((track) => {
      expect(screen.getByText(track)).toBeInTheDocument();
    });
  });

  // TODO: fix these unit tests. They provide false positives.
  it.skip("renders the mobile links", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 375,
      writable: true,
    });
    render(<AlbumContainer {...mockProps} />);

    const linksUnderCoverSection = screen.getByTestId("links-under-cover");
    expect(linksUnderCoverSection).toBeVisible();
    expect(linksUnderCoverSection.querySelectorAll("a").length).toBe(2);
  });

  it.skip("renders the tablet links", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 375,
      writable: true,
    });
    render(<AlbumContainer {...mockProps} />);

    const linksUnderCoverSection = screen.getByTestId("links-under-cover");
    expect(linksUnderCoverSection).toBeVisible();
    expect(linksUnderCoverSection.querySelectorAll("a").length).toBe(2);
  });
});
