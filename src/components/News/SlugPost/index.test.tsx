import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SlugPost from "./index";
import * as useNewsPostsModule from "../../../hooks/useNewsPosts/useNewsPosts";

describe("SlugPost", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // Suppress console.error during tests
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    consoleErrorSpy.mockRestore();
  });

  it("should throw an error if the type of post is an array", () => {
    expect(() => render(<SlugPost />)).toThrow(
      "Unexpected data type: SlugPost received an array of posts.",
    );
  });

  it("should render the text 'Post not found' if the useNewsPost hook returns null", () => {
    const spy = jest.spyOn(useNewsPostsModule, "default").mockReturnValue(null);

    render(<SlugPost />);

    expect(screen.getByText("Post not found")).toBeInTheDocument();

    spy.mockRestore();
  });

  it("should render the Post with all its corresponding values", () => {
    const spy = jest.spyOn(useNewsPostsModule, "default").mockReturnValue({
      body: "This is a test body",
      date: "2023-10-01",
      header: "Test Header",
      metaTags: [5, 6],
      slug: "test-slug",
    });

    render(<SlugPost />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Test Header",
    );
    expect(screen.getByText("This is a test body")).toBeInTheDocument();
    expect(screen.getByText("Sunday, Oct 01, 2023")).toBeInTheDocument();

    spy.mockRestore();
  });
});
