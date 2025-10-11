import getAlertType from "./getAlertType";

describe("getAlertType - function", () => {
  it('should return an object containing the info icon alt text and image url when alertType is "INFO"', () => {
    const result = getAlertType("INFO");
    const { alt, src } = result;

    expect(alt).toEqual("information icon");
    expect(src).toEqual("/images/msg_information-0.png");
  });

  it('should return an object containing the warning icon alt text and image url when alertType is "WARNING"', () => {
    const result = getAlertType("WARNING");
    const { alt, src } = result;

    expect(alt).toEqual("warning icon");
    expect(src).toEqual("/images/msg_warning-0.png");
  });

  it('should return an object containing the error icon alt text and image url when alertType is "ERROR"', () => {
    const result = getAlertType("ERROR");
    const { alt, src } = result;

    expect(alt).toEqual("error icon");
    expect(src).toEqual("/images/msg_error-0.png");
  });

  it('should return an object containing the success icon alt text and image url when alertType is "SUCCESS"', () => {
    const result = getAlertType("SUCCESS");
    const { alt, src } = result;

    expect(alt).toEqual("success icon");
    expect(src).toEqual("/images/trust0-0.png");
  });
});
