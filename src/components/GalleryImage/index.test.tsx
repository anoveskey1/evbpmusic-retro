import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GalleryImage from "./index";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useSanityImage } from "@hooks";

jest.mock("@hooks");

const mockUseSanityImage = useSanityImage as jest.MockedFunction<
  typeof useSanityImage
>;

const testImageId = "test-image";

describe("GalleryImage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render the image and back to gallery link without errors when a value image is provided", () => {
    mockUseSanityImage.mockReturnValue({
      _id: "image1",
      image: {
        asset: {
          _ref: "image-abc123-800x600-jpg",
          _type: "reference",
        },
      },
      alt: "Test Image",
    });
    window.history.pushState({}, "Test page", `/gallery/${testImageId}`);

    render(
      <MemoryRouter initialEntries={[`/gallery/${testImageId}`]}>
        <Routes>
          <Route path="/gallery/:imageId" element={<GalleryImage />} />
        </Routes>
      </MemoryRouter>,
    );

    const imgElement = screen.getByRole("img");
    const linkElement = screen.getByRole("link", { name: /back to gallery/i });
    expect(linkElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("alt", "Test Image");
  });

  it("should render the image unavailable component and back to gallery link without errors when a valid image cannot be found", () => {
    mockUseSanityImage.mockReturnValue(null);
    window.history.pushState({}, "Test page", `/gallery/${testImageId}`);

    render(
      <MemoryRouter initialEntries={[`/gallery/${testImageId}`]}>
        <Routes>
          <Route path="/gallery/:imageId" element={<GalleryImage />} />
        </Routes>
      </MemoryRouter>,
    );

    const imgElement = screen.getByRole("img");
    const linkElement = screen.getByRole("link", { name: /back to gallery/i });
    expect(linkElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "alt",
      "The linked image cannot be displayed. The file may have been moved, renamed, or deleted. Verify that the link points to the correct file and location.",
    );
  });
});
