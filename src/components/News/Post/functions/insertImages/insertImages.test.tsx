import React from "react";
import ImageUnavailable from "@components/ImageUnavailable";
import insertImages from "./insertImages";
import { Image } from "@/types";

jest.mock("@sanity/client");
jest.mock("@sanity/image-url");
jest.mock("nanoid");

describe("insertImages - function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should replace [[image:X]] placeholders with img elements", () => {
    const children: React.ReactNode[] = [];
    const node = document.createElement("div");
    node.innerHTML = "This is a test with an image [[image:0]] and some text.";

    const images: Image[] = [
      {
        alt: "Image 1",
        asset: {
          _ref: "image-12345",
          _type: "sanity.imageAsset",
        },
        customClass: "img-class",
      },
    ];

    insertImages(children, node, images);

    const result = children[0] as React.ReactElement;

    const divChildren = React.Children.toArray(result.props.children);
    const imgElement = divChildren.find(
      (child) => React.isValidElement(child) && child.type === "img",
    ) as React.ReactElement;

    expect(imgElement).toBeDefined();
    expect(imgElement.props.src).toBe("https://mocked.cdn/image.jpg");
    expect(imgElement.props.alt).toBe("Image 1");
    expect(imgElement.props.className).toBe("img-class");
    expect(divChildren.length).toBe(3); // Should contain the text and the image
  });

  it("should add 'Image' followed by index number alt text, and empty string for className when neither property is provided", () => {
    const children: React.ReactNode[] = [];
    const node = document.createElement("div");
    node.innerHTML = "This is a test with an image [[image:0]] and some text.";

    const images: Image[] = [
      {
        asset: {
          _ref: "image-12345",
          _type: "sanity.imageAsset",
        },
        alt: "",
      },
    ];

    insertImages(children, node, images);

    const result = children[0] as React.ReactElement;

    const divChildren = React.Children.toArray(result.props.children);
    const imgElement = divChildren.find(
      (child) => React.isValidElement(child) && child.type === "img",
    ) as React.ReactElement;

    expect(imgElement).toBeDefined();
    expect(imgElement.props.src).toBe("https://mocked.cdn/image.jpg");
    expect(imgElement.props.alt).toBe("Image 0");
    expect(imgElement.props.className).toBe("");
    expect(divChildren.length).toBe(3); // Should contain the text and the image
  });

  it("should replace missing images with ImageUnavailable component", () => {
    const children: React.ReactNode[] = [];
    const node = document.createElement("div");
    node.innerHTML = "This is a test with a missing image. [[image:1]]";

    insertImages(children, node, []);

    const result = children[0] as React.ReactElement;

    const divChildren = React.Children.toArray(result.props.children);
    const unavailableElement = divChildren.find(
      (child) => React.isValidElement(child) && child.type === ImageUnavailable,
    );
    expect(unavailableElement).toBeDefined();
    expect(divChildren.length).toBe(2);
  });

  it("should render plain HTML span when part does not match image placeholder", () => {
    const children: React.ReactNode[] = [];
    const node = document.createElement("div");
    node.innerHTML = "This is just normal text. No image.";

    insertImages(children, node);

    const result = children[0] as React.ReactElement;
    const divChildren = React.Children.toArray(result.props.children);

    const spanElement = divChildren.find(
      (child) => React.isValidElement(child) && child.type === "span",
    ) as React.ReactElement;

    expect(spanElement).toBeDefined();
    expect(spanElement.props.dangerouslySetInnerHTML.__html).toContain(
      "This is just normal text",
    );
  });

  it("should handle text nodes (like '\n')gracefully", () => {
    const children: React.ReactNode[] = [];
    const node = document.createTextNode("Just plain text");

    insertImages(children, node);

    // access first and only child of children
    const result = children[0] as React.ReactElement;

    expect(result.type).toBe("p");
    expect(result.props.dangerouslySetInnerHTML.__html).toBe("Just plain text");
  });

  it("should return nothing if textContent is empty", () => {
    const children: React.ReactNode[] = [];
    const node = document.createTextNode("");

    insertImages(children, node);

    const result = children[0] as React.ReactElement;

    expect(result).not.toBeDefined();
  });
});
