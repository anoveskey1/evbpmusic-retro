import { renderHook } from "@testing-library/react";
import INewsPost from "@typeDefs/INewsPost";
import useNewsPosts from "./useNewsPosts";
import newsPosts from "../../../public/evbp-blog-data.json";

describe("useNewsPosts", () => {
  it("should return an array of posts when no parameters are provided", () => {
    const { result } = renderHook(() => useNewsPosts());

    expect(result.current).toBeInstanceOf(Array);
    expect((result.current as Array<INewsPost>).length).toBeGreaterThan(0);
  });

  it("should return a single post when a valid slug is provided", () => {
    const { result } = renderHook(() => useNewsPosts("an-exciting-update"));

    expect(result.current).toBeInstanceOf(Object);
    expect(result.current).toHaveProperty("body");
    expect(result.current).toHaveProperty("date");
    expect(result.current).toHaveProperty("header");
    expect(result.current).toHaveProperty("metaTags");
    expect(result.current).toHaveProperty("slug");
  });

  it("should return null when an invalid slug is provided", () => {
    const { result } = renderHook(() => useNewsPosts("i-totally-made-this-up"));

    expect(result.current).toBeNull();
  });

  it("should return the most recent post when getMostRecent is true", () => {
    const { result } = renderHook(() => useNewsPosts(undefined, true));
    const mostRecentPost = newsPosts[0];

    expect(result.current).toBeInstanceOf(Object);
    expect(result.current).toEqual(mostRecentPost);
  });
});
