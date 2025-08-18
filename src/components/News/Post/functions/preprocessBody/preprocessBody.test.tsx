import insertImages from "../insertImages/insertImages";
import replaceFigureNodes from "../replaceFigureNodes/replaceFigureNodes";
import preprocessBody from "./preprocessBody";

jest.mock("../replaceFigureNodes/replaceFigureNodes");
jest.mock("../insertImages/insertImages");

describe("preprocessBody", () => {
  it("calls replaceFigureNodes and insertImages for each node", () => {
    const html = "<p>Hello</p><figure>image</figure><p>World</p>";

    const mockedReplaceFigureNodes = replaceFigureNodes as jest.Mock;
    const mockedInsertImages = insertImages as jest.Mock;

    mockedReplaceFigureNodes
      .mockReturnValueOnce(false) // <p>Hello</p>
      .mockReturnValueOnce(true) // <figure>...</figure>
      .mockReturnValueOnce(false); // <p>World</p>

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = preprocessBody(html);

    expect(mockedReplaceFigureNodes).toHaveBeenCalledTimes(3);

    expect(mockedInsertImages).toHaveBeenCalledTimes(2);
  });
});
