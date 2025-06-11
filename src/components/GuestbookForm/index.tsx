import { FC, useEffect, useState } from "react";

const GuestbookForm: FC = () => {
  const [username, setUsername] = useState<string>("your handle");
  const [email, setEmail] = useState<string>("your email");
  const [message, setMessage] = useState<string>("Enter your message");
  const [validationCode, setValidationCode] =
    useState<string>("validation code");

  const [isValidationCodeSent, setIsValidationCodeSent] =
    useState<boolean>(false);
  const [isEmailValidated, setIsEmailValidated] = useState<boolean>(false);

  const handleValidateEmail = async () => {
    const usernameNoSpaces = username.replace(" ", "_");

    try {
      const response = await fetch(
        `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/send-validation-code-to-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: usernameNoSpaces, email: email }),
        },
      );

      if (!response.ok) {
        throw new Error("unable to reach endpoint");
      } else {
        setIsValidationCodeSent(true);
        alert("Validation code sent to your email. Please check your inbox.");
      }
    } catch (error) {
      console.error("Error sending validation code:", error);
      alert("Failed to send validation code. Please try again later.");
      return;
    }
  };

  return (
    <form aria-label="guestbook-form">
      <input
        aria-label="guestbook-input-username"
        onChange={(e) => setUsername(e.target.value)}
        onFocus={() => setUsername("")}
        placeholder={username}
        type="text"
        value={username}
      />
      <input
        aria-label="guestbook-input-email"
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setEmail("")}
        placeholder={email}
        type="text"
        value={email}
      />
      {isValidationCodeSent && (
        <input
          aria-label="guestbook-input-validation-code"
          onChange={(e) => setValidationCode(e.target.value)}
          onFocus={() => setValidationCode("")}
          placeholder={validationCode}
          type="text"
        />
      )}
      {/*{isEmailValidated && (*/}
      {/*  <input*/}
      {/*    aria-label="guestbook-input-message"*/}
      {/*    onChange={(e) => setMessage(e.target.value)}*/}
      {/*    type="text"*/}
      {/*    value={message}*/}
      {/*  />*/}
      {/*)}*/}
      <button
        disabled={!username || !email}
        onClick={(event) => {
          event.preventDefault();
          handleValidateEmail();
        }}
      >
        Get Validation Code
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuestbookForm;
