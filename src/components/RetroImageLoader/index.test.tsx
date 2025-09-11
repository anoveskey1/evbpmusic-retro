import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RetroImageLoader from "./index";

describe("RetroImageLoader", () => {
  it("renders RetroImageLoader component", () => {
    render(<RetroImageLoader />);
    const retroImageLoaderElement = screen.getByTestId("retro-image-loader");
    expect(retroImageLoaderElement).toBeInTheDocument();
  });

  it("renders RetroImageLoader component with customized height and width when provided", () => {
    render(<RetroImageLoader height={100} width={200} />);
    const retroImageLoaderElement = screen.getByTestId("retro-image-loader");
    expect(retroImageLoaderElement).toBeInTheDocument();
    expect(retroImageLoaderElement).toHaveAttribute(
      "style",
      "border: 1px ridge lightgray; clip-path: inset(0 0 100% 0); transition: clip-path 0.3s linear; height: 100px; width: 200px;",
    );
  });
});
