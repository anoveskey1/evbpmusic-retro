import React from "react";
import insertImages from "./insertImages";
import ImageUnavailable from "../../../../ImageUnavailable";

describe("insertImages - function", () => {
  it("should replace [[image:X]] placeholders with img elements", () => {
    const children: React.ReactNode[] = [];
    const node = document.createElement("div");
    node.innerHTML = "This is a test with an image [[image:0]] and some text.";

    const images = [
      {
        url: "http://example.com/image1.jpg",
        alt: "Image 1",
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
    expect(imgElement.props.src).toBe("http://example.com/image1.jpg");
    expect(imgElement.props.alt).toBe("Image 1");
    expect(imgElement.props.className).toBe("img-class");
    expect(divChildren.length).toBe(3); // Should contain the text and the image
  });

  it("should add 'Image' followed by index number alt text, and empty string for className when neither property is provided", () => {
    const children: React.ReactNode[] = [];
    const node = document.createElement("div");
    node.innerHTML = "This is a test with an image [[image:0]] and some text.";

    const images = [{ url: "http://example.com/image1.jpg", alt: "" }];

    insertImages(children, node, images);

    const result = children[0] as React.ReactElement;

    const divChildren = React.Children.toArray(result.props.children);
    const imgElement = divChildren.find(
      (child) => React.isValidElement(child) && child.type === "img",
    ) as React.ReactElement;

    expect(imgElement).toBeDefined();
    expect(imgElement.props.src).toBe("http://example.com/image1.jpg");
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

  it("should handle text nodes (like '\n')gracefully", () => {
    const children: React.ReactNode[] = [];
    const node = document.createTextNode("Just plain text");

    insertImages(children, node);

    // access first and only child of children
    const result = children[0] as React.ReactElement;

    expect(result.type).toBe("div");
    expect(result.props.dangerouslySetInnerHTML.__html).toBe("Just plain text");
  });

  it("should return an empty text nodes if textContent is empty", () => {
    const children: React.ReactNode[] = [];
    const node = document.createTextNode("");

    insertImages(children, node);

    const result = children[0] as React.ReactElement;

    expect(result.type).toBe("div");
    expect(result.props.dangerouslySetInnerHTML.__html).toBe("");
  });
});
