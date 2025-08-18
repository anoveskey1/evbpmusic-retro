import ImageUnavailable from "@components/ImageUnavailable";
import React from "react";

const replaceFigureNodes = (
  children: React.ReactNode[],
  node: ChildNode,
): boolean => {
  if (node.nodeName === "FIGURE") {
    children.push(<ImageUnavailable key={children.length} width={50} />);
    return true;
  }

  return false;
};

export default replaceFigureNodes;
