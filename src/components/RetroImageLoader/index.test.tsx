import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RetroImageLoader from "./index";

describe("RetroImageLoader", () => {
  test("renders IRetroImageLoader component", () => {
    render(<RetroImageLoader />);
    const retroImageLoaderElement = screen.getByTestId("retro-image-loader");
    expect(retroImageLoaderElement).toBeInTheDocument();
  });
});
