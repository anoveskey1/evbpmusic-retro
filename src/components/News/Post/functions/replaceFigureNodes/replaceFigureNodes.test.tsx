import React from "react";
import ImageUnavailable from "@components/ImageUnavailable";
import replaceFigureNodes from "./replaceFigureNodes";

describe("replaceFigureNodes - function", () => {
  it("should replace FIGURE nodes with ImageUnavailable component", () => {
    const children: React.ReactNode[] = [];
    const figureNode = document.createElement("figure");

    expect(children).toHaveLength(0);
    const result = replaceFigureNodes(children, figureNode);

    expect(result).toBe(true);
    expect(children).toHaveLength(1);
    expect(children[0]).toEqual(<ImageUnavailable key={0} width={50} />);
  });

  it("should not modify children if node is not FIGURE", () => {
    const children: React.ReactNode[] = [<div key="1">Test</div>];
    const nonFigureNode = document.createElement("div");

    expect(children).toHaveLength(1);
    const result = replaceFigureNodes(children, nonFigureNode);

    expect(result).toBe(false);
    expect(children).toHaveLength(1);
    expect(children[0]).toEqual(<div key="1">Test</div>);
  });
});
