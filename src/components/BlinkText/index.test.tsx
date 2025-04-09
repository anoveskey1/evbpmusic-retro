import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlinkText from "./index";

describe("BlinkText", () => {
  test("renders BlinkText component", () => {
    render(<BlinkText text="mock text" />);
    const blinkTextElement = screen.getByTestId("blink-text");
    expect(blinkTextElement).toBeInTheDocument();
    expect(blinkTextElement).toHaveTextContent("mock text");
  });

  test("toggles visibility every 500ms", () => {
    jest.useFakeTimers();
    render(<BlinkText text="mock text" />);
    const blinkTextElement = screen.getByTestId("blink-text");

    expect(blinkTextElement).toBeVisible();

    // Fast-forward 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(blinkTextElement).not.toBeVisible();

    // Fast-forward another 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(blinkTextElement).toBeVisible();

    jest.useRealTimers();
  });

  test("has bold text when isBold is true", () => {
    render(<BlinkText text="mock text" isBold={true} />);
    const blinkTextElement = screen.getByTestId("blink-text");
    expect(blinkTextElement).toHaveStyle("font-weight: bold");
  });
});
