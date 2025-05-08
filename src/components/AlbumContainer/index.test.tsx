import { act, render, screen } from "@testing-library/react";
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
    summary: "Lorem ipsum dollop.",
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

  it("toggles the summary visibility when the button is clicked", () => {
    render(<AlbumContainer {...mockProps} />);
    const summaryButton = screen.getByRole("button");
    expect(screen.queryByText(/Lorem ipsum dollop./i)).toHaveClass("hide");

    act(() => summaryButton.click());
    expect(screen.getByText(/Lorem ipsum dollop./i)).toHaveClass("show");

    act(() => summaryButton.click());
    expect(screen.queryByText(/Lorem ipsum dollop./i)).toHaveClass("hide");
  });
});
