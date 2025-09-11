import { renderHook, waitFor } from "@testing-library/react";
import useSanityImage from "./useSanityImage";
import sanityClient from "@/services/sanity/sanityClient";
import { GalleryImageDoc } from "@/types";

jest.mock("@/services/sanity/sanityClient", () => ({
  __esModule: true,
  default: {
    fetch: jest.fn().mockResolvedValue(null),
  },
}));

describe("useSanityImage - hook", () => {
  it("should return null when imageId is not provided", async () => {
    const { result } = renderHook(() => useSanityImage(""));

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });

  it("should return null when image is not found", async () => {
    (sanityClient.fetch as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useSanityImage("non-existent-id"));

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });

  it("should return the image document when image is found", async () => {
    const mockImage: GalleryImageDoc = {
      alt: "Mock Image",
      _id: "1",
      image: { asset: { _ref: "mock-ref", _type: "mockType" } },
      name: "mock-image",
    };

    (sanityClient.fetch as jest.Mock).mockResolvedValueOnce(mockImage);

    const { result } = renderHook(() => useSanityImage("mock-image"));

    await waitFor(() => {
      expect(result.current).toEqual(mockImage);
    });
  });

  it("should handle fetch errors gracefully and return null", async () => {
    (sanityClient.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Mock Fetch error"),
    );

    const { result } = renderHook(() => useSanityImage("any-id"));

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });
});
