import sanityClient from "@/services/sanity/sanityClient";
import { renderHook, waitFor } from "@testing-library/react";
import useSanityImages from "./useSanityImages";
import { GalleryImageDoc } from "@/types";

jest.mock("@/services/sanity/sanityClient", () => ({
  __esModule: true,
  default: {
    fetch: jest.fn().mockResolvedValue([]),
  },
}));

describe("useSanityImages - hook", () => {
  it("should return an empty array when there are no images", async () => {
    const { result } = renderHook(() => useSanityImages());

    await waitFor(() => {
      expect(result.current).toEqual([]);
    });
  });

  it("should return an array of image documents when images are available", async () => {
    const mockImages: GalleryImageDoc[] = [
      {
        alt: "Image 1",
        _id: "1",
        image: { asset: { _ref: "mock-ref-1", _type: "mockType" } },
        name: "image-1",
      },
      {
        alt: "Image 2",
        _id: "2",
        image: { asset: { _ref: "mock-ref-2", _type: "mockType" } },
        name: "image-2",
      },
    ];

    (sanityClient.fetch as jest.Mock).mockResolvedValueOnce(mockImages);

    const { result } = renderHook(() => useSanityImages());

    await waitFor(() => {
      expect(result.current).toEqual(mockImages);
    });
  });

  it("should handle fetch errors gracefully and return an empty array", async () => {
    (sanityClient.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Mock Fetch error"),
    );

    const { result } = renderHook(() => useSanityImages());

    await waitFor(() => {
      expect(result.current).toEqual([]);
    });
  });
});
