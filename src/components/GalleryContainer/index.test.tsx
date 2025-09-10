import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import GalleryContainer from "@components/GalleryContainer/index";
import { useSanityImages } from "@hooks";

jest.mock("@hooks", () => ({
  __esModule: true,
  useSanityImages: jest.fn(),
  useWindowWidth: jest.fn(() => 1024),
}));

const mockedUseSanityImages = useSanityImages as jest.Mock;

describe("GalleryContainer", () => {
  it("should render without errors", () => {
    mockedUseSanityImages.mockReturnValueOnce([
      {
        _id: "1",
        name: "image1",
        alt: "Image 1",
        image: {
          asset: {
            _ref: "image-abc123-800x600-jpg",
            _type: "mockType",
          },
        },
      },
      {
        _id: "2",
        name: "image2",
        alt: "Image 2",
        image: {
          asset: {
            _ref: "image-def456-800x600-jpg",
            _type: "mockType",
          },
        },
      },
    ]);

    render(
      <MemoryRouter>
        <GalleryContainer />
      </MemoryRouter>,
    );
    const galleryElement = screen.getByRole("region", {
      name: /image gallery/i,
    });
    const imageElements = screen.getAllByRole("img");

    expect(galleryElement).toBeInTheDocument();
    expect(imageElements.length).toBe(2);
    expect(imageElements[0]).toHaveAttribute("alt", "Image 1");
  });

  it("should render even if no images are available", () => {
    mockedUseSanityImages.mockReturnValueOnce([]);

    render(
      <MemoryRouter>
        <GalleryContainer />
      </MemoryRouter>,
    );
    const galleryElement = screen.getByRole("region", {
      name: /image gallery/i,
    });
    const imageElements = screen.queryAllByRole("img");

    expect(galleryElement).toBeInTheDocument();
    expect(imageElements.length).toBe(0);
  });
});
