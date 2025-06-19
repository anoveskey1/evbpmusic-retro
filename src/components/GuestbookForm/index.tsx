import { FC, useState } from "react";
import "./style.less";
import sendValidationCode from "./functions/sendValidationCode/sendValidationCode";
import signGuestbook from "./functions/signGuestbook/signGuestbook";
import validateUser from "./functions/validateUser/validateUser";

const GuestbookForm: FC = () => {
  const [username, setUsername] = useState<string>("your handle");
  const [email, setEmail] = useState<string>("your email");
  const [message, setMessage] = useState<string>("");
  const [validationCode, setValidationCode] = useState<string>("");

  const [isValidationCodeSent, setIsValidationCodeSent] =
    useState<boolean>(false);
  const [isUserValidated, setIsUserValidated] = useState<boolean>(false);
  const [isGuestbookSigned, setIsGuestbookSigned] = useState<boolean>(false);

  const handleSendValidationCode = async () => {
    const response = await sendValidationCode(email, username);

    if (response === true) {
      setIsValidationCodeSent(true);
      alert("Validation code sent to your email. Please check your inbox.");
    } else if (typeof response === "object" && "message" in response) {
      alert(`Failed to send validation code: ${response.message}`);
      return;
    } else {
      alert("An unknown error has occurred. Please try again later.");
    }
  };

  const handleSignGuestbook = async () => {
    const response = await signGuestbook(message, username);

    if (typeof response === "string") {
      setEmail("");
      setUsername("");
      setValidationCode("");
      setIsValidationCodeSent(false);
      setIsUserValidated(false);
      setIsGuestbookSigned(true);
      alert(response);
      return;
    } else if (typeof response === "object" && "message" in response) {
      alert(`Failed to sign guestbook: ${response.message}`);
      return;
    }
  };

  const handleValidateUser = async () => {
    const response = await validateUser(validationCode);

    if (response && "status" in response) {
      setIsUserValidated(true);
      alert(response.message);
      return;
    } else {
      alert(response.message);
    }
  };

  // TODO: Add styling to the form including:
  // white background on fields
  // turn text a light gray color to indicate it is no longer editable
  return (
    <form aria-label="guestbook-form" className="guestbook-form">
      <div className="guestbook-form-username-field">
        <label htmlFor="username">Handle</label>
        <input
          aria-label="guestbook-input-username"
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value.replace(/ /g, "_"))}
          placeholder={username}
          readOnly={isValidationCodeSent}
          type="text"
          value={username}
        />
      </div>
      <div className="guestbook-form-email-field">
        <label htmlFor="email">Email</label>
        <input
          aria-label="guestbook-input-email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder={email}
          readOnly={isValidationCodeSent}
          type="text"
          value={email}
        />
      </div>
      {isValidationCodeSent && !isUserValidated && (
        <div className="guestbook-form-validation-code-field">
          <label htmlFor="validationCode">Validation Code</label>
          <input
            aria-label="guestbook-input-validation-code"
            id="validationCode"
            name="validationCode"
            onChange={(e) => setValidationCode(e.target.value)}
            readOnly={isUserValidated}
            type="password"
          />
        </div>
      )}
      {isUserValidated && (
        <div className="guestbook-form-message-field">
          <label htmlFor="message">Message</label>
          <input
            aria-label="guestbook-input-message"
            id="message"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            readOnly={isGuestbookSigned}
            type="text"
            value={message}
          />
        </div>
      )}
      <div className="guestbook-form-actions">
        {!isValidationCodeSent && (
          <button
            disabled={!username || !email || isValidationCodeSent}
            onClick={(event) => {
              event.preventDefault();
              handleSendValidationCode();
            }}
          >
            Get Validation Code
          </button>
        )}
        {isValidationCodeSent && !isUserValidated && (
          <button
            disabled={isUserValidated}
            onClick={(event) => {
              event.preventDefault();
              handleValidateUser();
            }}
          >
            Validate User
          </button>
        )}
        <button
          disabled={!isUserValidated || isGuestbookSigned}
          onClick={(event) => {
            event.preventDefault();
            if (!message) {
              alert("Please enter a message to sign the guestbook.");
              return;
            } else {
              handleSignGuestbook();
            }
          }}
        >
          Sign The Guestbook
        </button>
      </div>
    </form>
  );
};

export default GuestbookForm;
