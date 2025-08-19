import IApiError from "@typeDefs/IApiError";

const sendValidationCode = async (
  email: string,
  username: string,
): Promise<IApiError | boolean> => {
  const response = await fetch(
    `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/send-validation-code-to-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, email: email }),
    },
  );

  if (response.ok) {
    return true;
  }

  const errorData = await response.json();
  console.error(`Error sending validation code: ${errorData.code}`);
  return errorData;
};

export default sendValidationCode;
