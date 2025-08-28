import { renderHook, waitFor } from "@testing-library/react";
import useNewsPost from "@hooks/useNewsPost/useNewsPost";
import INewsPost from "@/types/INewsPost";

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

describe("useNewsPost", () => {
  it("should return a single post when a valid slug is provided", async () => {
    mockFetch(true, { result: mockPost });
    const { result } = renderHook(() => useNewsPost("first-post"));

    await waitFor(() => {
      expect(result.current).toBeInstanceOf(Object);
      expect(result.current).toHaveProperty(
        "body",
        "This is the body of the first post.",
      );
    });
  });

  it("should return a null when an invalid slug is provided", async () => {
    mockFetch(true, { result: mockPost });
    const { result } = renderHook(() => useNewsPost("second-post"));

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });

  it("should handle fetch errors that are not AbortError", async () => {
    const mockError = new Error("Network failure");
    mockError.name = "MockError";

    global.fetch = jest.fn().mockRejectedValue(mockError);

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useNewsPost("first-post"));

    await waitFor(() => {
      expect(result.current).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching single post:",
        mockError,
      );
    });

    consoleSpy.mockRestore();
  });
});
