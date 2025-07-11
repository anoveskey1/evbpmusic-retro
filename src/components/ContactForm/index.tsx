import emailValidator from "email-validator";
import { useState } from "react";
import { SUBJECT_OPTIONS } from "./emailSubjectOptions";
import IContactForm from "../../types/IContactForm";
import sanitizeInput from "./sanitizeInput";
import "./style.less";

const ContactForm: React.FC<IContactForm> = (props: IContactForm) => {
  const { turnstileSiteKey } = props;
  const maxCharactersForMessage = 800;
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [subject, setSubject] = useState<string>(SUBJECT_OPTIONS[0].value);

  const clearForm = () => {
    setEmail("");
    setSubject(SUBJECT_OPTIONS[0].value);
    setMessage("");
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate email return email address
    if (!emailValidator.validate(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // sanitize user input before sending the email
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedSubject = sanitizeInput(subject);

    const params = {
      email: sanitizedEmail,
      message: sanitizedMessage,
      subject: sanitizedSubject,
    };

    try {
      const response = await fetch(
        `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send email");
      } else {
        alert("Message sent!");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send message. Please try again later.");
    }

    clearForm();
  };

  return (
    <form
      aria-label="contact-form"
      className="contact-form"
      name="contact-form"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        required
        type="text"
        value={email}
      />
      <label htmlFor="subject">Subject</label>
      <select
        id="subject"
        name="subject"
        onChange={handleSubjectChange}
        required
        value={subject}
      >
        {SUBJECT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        maxLength={maxCharactersForMessage}
        onChange={(e) => setMessage(e.target.value)}
        required
        value={message}
      />
      <span className="character-limit">
        maximum characters: {maxCharactersForMessage};
        <span
          className={
            maxCharactersForMessage - message.length <= 15 ? "near-limit" : ""
          }
        >
          remaining: {maxCharactersForMessage - message.length}
        </span>
      </span>
      <div className="cf-turnstile" data-sitekey={turnstileSiteKey}></div>
      <div className="button-section">
        <button onClick={clearForm} type="button">
          Clear
        </button>
        <button disabled={email === "" || message === ""} type="submit">
          Send
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
