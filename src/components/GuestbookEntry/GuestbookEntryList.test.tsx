import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import IGuestbookEntry from "@typeDefs/IGuestbookEntry";
import GuestbookEntryList from "./GuestbookEntryList";

const mockGuestbookEntries: IGuestbookEntry[] = [
  {
    username: "test_user",
    message: "This is a test message.",
  },
  {
    username: "another_user",
    message: "Another test message.",
  },
];

const mockFetch = (responseOk: boolean) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: responseOk,
      json: () =>
        Promise.resolve(
          responseOk
            ? mockGuestbookEntries
            : {
                code: "MOCK_ERROR",
                message: "Network error. Unable to get guestbook entries.",
              },
        ),
    }),
  ) as jest.Mock;
};

console.error = jest.fn();

describe("GuestbookEntryList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without errors", async () => {
    mockFetch(true);
    render(<GuestbookEntryList />);

    await waitFor(() => {
      expect(
        screen.getByRole("region", { name: "Guestbook Entries" }),
      ).toBeInTheDocument();
      expect(screen.getByText("This is a test message.")).toBeInTheDocument();
      expect(screen.getByText("Another test message.")).toBeInTheDocument();
    });
  });

  it("should throw an error when the response from the get-guestbook-entries API is not ok", async () => {
    mockFetch(false);
    render(<GuestbookEntryList />);

    await waitFor(() => {
      expect(
        screen.queryByText("This is a test message."),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Another test message."),
      ).not.toBeInTheDocument();
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching guestbook entries:",
        "Network error. Unable to get guestbook entries.",
      );
    });
  });
});
