import { waitFor } from "@testing-library/react";
import validateUser from "./validateUser";

const mockFetch = (responseOk: boolean) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: responseOk,
      status: responseOk ? 200 : 400,
      json: () =>
        Promise.resolve(
          responseOk
            ? {
                message:
                  "Email validated successfully. You can now sign the guestbook!",
                status: 200,
              }
            : {
                code: "MOCK_ERROR",
                message: "Whaddya think yer doin up in here?!",
              },
        ),
    }),
  ) as jest.Mock;
};

describe("validateUser", () => {
  it("Should return a status code and a success message when the API call is successful", async () => {
    mockFetch(true);
    const response = await validateUser("VALIDATION_CODE");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/validate-user`,
        expect.objectContaining({
          body: JSON.stringify({ validationCode: "VALIDATION_CODE" }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }),
      );
    });

    expect(response).toStrictEqual({
      message: "Email validated successfully. You can now sign the guestbook!",
      status: 200,
    });
  });

  it("should return an API Error object when the API call fails", async () => {
    mockFetch(false);
    const response = await validateUser("INVALID_CODE");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/validate-user`,
        expect.objectContaining({
          body: JSON.stringify({ validationCode: "INVALID_CODE" }),
          headers: { "Content-Type": "application/json" },
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
