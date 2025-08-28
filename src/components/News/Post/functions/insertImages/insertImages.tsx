import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import ImageUnavailable from "@components/ImageUnavailable";
import type { Image } from "@typeDefs";
import sanityClient from "../../../../../services/sanity";

const insertImages = (
  children: React.ReactNode[],
  node: ChildNode,
  images?: Image[],
) => {
  const builder = imageUrlBuilder(sanityClient);
  const urlFor = (source: any) => builder.image(source);

  if (node.nodeType === Node.ELEMENT_NODE && node instanceof Element) {
    // Replace [[image:X]] placeholders inside the HTML string
    const inner = node.innerHTML;
    const parts = inner.split(/(\[\[image:\d+\]\])/g);

    const nodes: React.ReactNode[] = [];

    parts.forEach((part, index) => {
      if (!part) return;

      const match = part.match(/\[\[image:(\d+)\]\]/);

      if (match) {
        const imageIndex = parseInt(match[1]);
        const image = Array.isArray(images) ? images[imageIndex] : undefined;

        if (image) {
          nodes.push(
            <img
              alt={image.alt || `Image ${imageIndex}`}
              className={image.customClass || ""}
              key={`image-${imageIndex}-${index}`}
              src={urlFor(image.asset).url()}
            />,
          );
        } else {
          nodes.push(
            <ImageUnavailable key={`image-unavailable-${index}`} width={50} />,
          );
        }
      } else {
        nodes.push(
          <span
            dangerouslySetInnerHTML={{ __html: part }}
            key={`text-part-${index}`}
          />,
        );
      }
    });

    children.push(
      React.createElement(
        node.nodeName.toLowerCase(),
        { key: children.length },
        nodes,
      ),
    );

    return;
  } else {
    // handle text nodes by rendering their textContent
    const text = (node as Text).textContent || "";

    if (text.trim()) {
      children.push(
        <p dangerouslySetInnerHTML={{ __html: text }} key={children.length} />,
      );
    }
  }
};

export default insertImages;
