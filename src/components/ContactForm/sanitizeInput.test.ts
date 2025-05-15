import sanitizeInput from "./sanitizeInput";

describe("sanitizeInput", () => {
  it("should remove any markup tags from the input string", () => {
    const testString = "I am being sneaky<h1>Hello World!</h1>";
    const expectedResult = "I am being sneaky&lt;h1&gt;Hello World!&lt;/h1&gt;";

    expect(sanitizeInput(testString)).toEqual(expectedResult);
  });
});
