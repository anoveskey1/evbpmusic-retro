import React, { ReactNode } from "react";
import type { Image } from "@typeDefs";
import insertImages from "../insertImages";
import replaceFigureNodes from "../replaceFigureNodes";

const preprocessBody = (html: string, images?: Image[]): ReactNode[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const children: React.ReactNode[] = [];

  doc.body.childNodes.forEach((node) => {
    if (replaceFigureNodes(children, node)) {
      // current node is a figure element so replace it and continue
      return;
    }

    insertImages(children, node, images);
  });

  return children;
};

export default preprocessBody;
