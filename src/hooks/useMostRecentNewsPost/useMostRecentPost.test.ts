import INewsPost from "@/types/INewsPost";
import { renderHook, waitFor } from "@testing-library/react";
import useMostRecentNewsPost from "./useMostRecentNewsPost";

const mockPost: INewsPost = {
  body: "This is the body of the first post.",
  date: "2023-01-01",
  header: "First Post",
  slug: { _type: "slug", current: "first-post" },
};

const mockFetch = (ok: boolean, jsonResponse: object) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: async () => jsonResponse,
  });
};

describe("useMostRecentNewsPost", () => {
  it("should return the most recent post", async () => {
    mockFetch(true, { result: mockPost });
    const { result } = renderHook(() => useMostRecentNewsPost());

    await waitFor(() => {
      expect(result.current).toBeInstanceOf(Object);
      expect(result.current).toEqual(mockPost);
    });
  });

  it("should return null if an error occurs during fetch", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Failed to fetch")));

    const { result } = renderHook(() => useMostRecentNewsPost());

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });
});
