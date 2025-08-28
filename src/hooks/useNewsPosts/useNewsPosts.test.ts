import { renderHook, waitFor } from "@testing-library/react";
import INewsPost from "@typeDefs/INewsPost";
import useNewsPosts from "./useNewsPosts";

const mockPosts: INewsPost[] = [
  {
    body: "This is the body of the first post.",
    date: "2023-01-01",
    header: "First Post",
    slug: { _type: "slug", current: "first-post" },
  },
  {
    body: "This is the body of the second post.",
    date: "2023-02-01",
    header: "Second Post",
    slug: { _type: "slug", current: "second-post" },
  },
];

const mockFetch = (ok: boolean, jsonResponse: object) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    json: async () => jsonResponse,
  });
};

describe("useNewsPosts", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return an array of posts", async () => {
    mockFetch(true, { result: mockPosts });
    const { result } = renderHook(() => useNewsPosts());

    await waitFor(() => {
      expect(result.current).toBeInstanceOf(Array);
      expect((result.current as Array<INewsPost>).length).toBe(2);
    });
  });

  it("should throw an error when the response is not ok", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const errorMessage = "mock error";

    mockFetch(false, { message: errorMessage });

    const { result } = renderHook(() => useNewsPosts());

    await waitFor(() => {
      expect(result.current).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Unexpected fetch error:",
        expect.any(Error),
      );
    });

    consoleSpy.mockRestore();
  });
});
