import { renderHook } from "@testing-library/react";
import ILegacyNewsPost from "@typeDefs/ILegacyNewsPost";
import useLegacyNewsPosts from "./useLegacyNewsPosts";

describe("useLegacyNewsPosts", () => {
  it("should return an array of legacy news posts", () => {
    const { result } = renderHook(() => useLegacyNewsPosts());

    expect(result.current).toBeInstanceOf(Array);
    expect((result.current as Array<ILegacyNewsPost>).length).toBeGreaterThan(
      0,
    );
    const post = result.current[0];

    expect(post).toHaveProperty("body");
    expect(post).toHaveProperty("date");
    expect(post).toHaveProperty("header");
    expect(post).toHaveProperty("metaTags");
    expect(Array.isArray(post.metaTags)).toBe(true);
    expect(post.metaTags?.every((tag) => typeof tag === "number")).toBe(true);
    expect(post).toHaveProperty("slug");
    expect(typeof post.slug).toBe("string");
  });
});
