import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VisitorCounter from "./index";

const mockFetch = (fetchDoesResolve: boolean) => {
  global.fetch = jest.fn(() =>
    fetchDoesResolve
      ? Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ count: 12345678 }),
        })
      : Promise.reject(),
  ) as jest.Mock;
};

describe("VisitorCounter", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly and displays visitor count", async () => {
    mockFetch(true);
    render(<VisitorCounter />);

    const youAreVisitorText = screen.getByText("You are visitor #");
    const visitorCountText = await screen.findByText("12345678");
    const welcomeText = screen.getByText("to the site. Welcome!");

    expect(youAreVisitorText).toBeInTheDocument();
    expect(visitorCountText).toBeInTheDocument();
    expect(welcomeText).toBeInTheDocument();
  });

  it("renders correctly even when API call is unsuccessful", async () => {
    mockFetch(false);
    render(<VisitorCounter />);

    const youAreVisitorText = screen.getByText("You are visitor #");
    const visitorCountText = await screen.findByText("00000000");
    const welcomeText = screen.getByText("to the site. Welcome!");

    expect(youAreVisitorText).toBeInTheDocument();
    expect(visitorCountText).toBeInTheDocument();
    expect(welcomeText).toBeInTheDocument();
  });
});
