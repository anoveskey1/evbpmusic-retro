import IApiSuccess from "../../../../types/IApiSuccess";
import IApiError from "../../../../types/IApiError";

const validateUser = async (
  validationCode: string,
): Promise<IApiSuccess | IApiError> => {
  const response = await fetch(
    `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/validate-user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        validationCode: validationCode,
      }),
    },
  );

  if (response.ok) {
    return {
      message: "Email validated successfully. You can now sign the guestbook!",
      status: response.status,
    };
  } else {
    const errorData = await response.json();
    console.error("Error validating user: ", errorData.code);
    return errorData;
  }
};

export default validateUser;
