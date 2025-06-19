import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GuestbookEntry from "./GuestbookEntry";

describe("GuestbookEntry", () => {
  it("should render without errors", () => {
    render(
      <GuestbookEntry
        username="mock_user_1234"
        message="This is a test message."
      />,
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "mock_user_1234 wrote:",
    );
    expect(screen.getByText("This is a test message.")).toBeInTheDocument();
  });
});
