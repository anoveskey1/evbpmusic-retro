import sendValidationCode from "./sendValidationCode";
import { waitFor } from "@testing-library/react";

const mockFetch = (responseOk: boolean) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: responseOk,
      json: () =>
        Promise.resolve(
          responseOk
            ? { success: true }
            : {
                code: "MOCK_ERROR",
                message: "Whaddya think yer doin up in here?!",
              },
        ),
    }),
  ) as jest.Mock;
};

describe("sendValidationCode", () => {
  it("should return true when the API call is successful", async () => {
    mockFetch(true);
    const response = await sendValidationCode(
      "joeschmoe@mocksite.net",
      "Joe_Cool",
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/send-validation-code-to-email`,
        expect.objectContaining({
          body: JSON.stringify({
            username: "Joe_Cool",
            email: "joeschmoe@mocksite.net",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }),
      );
    });

    expect(response).toStrictEqual(true);
  });

  it("should return an API Error object when the API call is successful", async () => {
    mockFetch(false);
    const response = await sendValidationCode(
      "joeschmoe@mocksite.net",
      "Joe_Cool",
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/send-validation-code-to-email`,
        expect.objectContaining({
          body: JSON.stringify({
            username: "Joe_Cool",
            email: "joeschmoe@mocksite.net",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }),
      );
    });

    expect(response).toStrictEqual({
      code: "MOCK_ERROR",
      message: "Whaddya think yer doin up in here?!",
    });
  });
});
