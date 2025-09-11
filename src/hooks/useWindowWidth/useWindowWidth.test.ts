import useWindowWidth from "./useWindowWidth";
import { renderHook, act } from "@testing-library/react";

describe("useWindowWidth - hook", () => {
  it("should return the current window width", () => {
    const { result } = renderHook(() => useWindowWidth());

    expect(result.current).toBe(1024); // default jsdom width

    act(() => {
      (window.innerWidth as number) = 800;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual(800);
  });
});
