import { renderHook } from "@testing-library/react";
import INewsPost from "@typeDefs/INewsPost";
import useLegacyNewsPosts from "./useLegacyNewsPosts";
import newsPosts from "../../../public/evbp-blog-data.json";

describe("useLegacyNewsPosts", () => {
  it("should return an array of posts when no parameters are provided", () => {
    const { result } = renderHook(() => useLegacyNewsPosts());

    expect(result.current).toBeInstanceOf(Array);
    expect((result.current as Array<INewsPost>).length).toBeGreaterThan(0);
  });

  it("should return a single post when a valid slug is provided", () => {
    const { result } = renderHook(() =>
      useLegacyNewsPosts("an-exciting-update"),
    );

    expect(result.current).toBeInstanceOf(Object);
    expect(result.current).toHaveProperty("body");
    expect(result.current).toHaveProperty("date");
    expect(result.current).toHaveProperty("header");
    expect(result.current).toHaveProperty("metaTags");
    expect(result.current).toHaveProperty("slug");
  });

  it("should return null when an invalid slug is provided", () => {
    const { result } = renderHook(() =>
      useLegacyNewsPosts("i-totally-made-this-up"),
    );

    expect(result.current).toBeNull();
  });

  it("should return the most recent post when getMostRecent is true", () => {
    const { result } = renderHook(() => useLegacyNewsPosts(undefined, true));
    const mostRecentPost = newsPosts[0];

    expect(result.current).toBeInstanceOf(Object);
    expect(result.current).toEqual(mostRecentPost);
  });
});
