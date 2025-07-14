const signGuestbook = async (
  message: string,
  username: string,
): Promise<string | object> => {
  const response = await fetch(
    `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/sign-guestbook`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        message: message,
      }),
    },
  );

  if (response.ok) {
    const data = await response.json();
    return data.message;
  } else {
    const errorData = await response.json();
    console.error("Error signing guestbook:", errorData.code);
    return errorData;
  }
};

export default signGuestbook;
