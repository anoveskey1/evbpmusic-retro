import signGuestbook from "./signGuestbook";
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

describe("signGuestbook", () => {
  it("should return a success message when the API call is successful", async () => {
    mockFetch(true);
    const response = await signGuestbook("Hello, world!", "Joe_Cool");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/sign-guestbook`,
        expect.objectContaining({
          body: JSON.stringify({
            username: "Joe_Cool",
            message: "Hello, world!",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }),
      );
    });

    expect(response).toBe("Guestbook signed successfully!");
  });

  it("should return an API Error object when the API call fails", async () => {
    mockFetch(false);
    const response = await signGuestbook("Hello, world!", "Joe_Cool");

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/sign-guestbook`,
        expect.objectContaining({
          body: JSON.stringify({
            username: "Joe_Cool",
            message: "Hello, world!",
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }),
      );
    });

    expect(response).toEqual({
      code: "MOCK_ERROR",
      message: "Whaddya think yer doin up in here?!",
    });
  });
});
