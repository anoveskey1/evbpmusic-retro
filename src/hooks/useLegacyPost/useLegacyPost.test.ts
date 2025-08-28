import { renderHook } from "@testing-library/react";
import newsPosts from "../../../public/evbp-blog-data.json";
import useLegacyPost from "./useLegacyPost";

describe("useLegacyPost", () => {
  it("should return a single post when a valid slug is provided", () => {
    const validSlug = newsPosts[0].slug;

    const { result } = renderHook(() => useLegacyPost(validSlug));

    expect(result.current).not.toBeNull();
    expect(result.current?.slug).toBe(validSlug);
  });

  it("should return null when an invalid slug is provided", () => {
    const { result } = renderHook(() => useLegacyPost("non-existent-slug"));

    expect(result.current).toBeNull();
  });

  it("should return null when an empty slug is provided", () => {
    const { result } = renderHook(() => useLegacyPost(""));

    expect(result.current).toBeNull();
  });
});
