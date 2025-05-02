import emailjs from "@emailjs/browser";
import emailValidator from "email-validator";
import { useState } from "react";
import { SUBJECT_OPTIONS } from "./emailSubjectOptions";
import "./index.less";

const ContactForm: React.FC = () => {
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

    if (!emailValidator.validate(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const params = {
      email: email,
      message: message,
      subject: subject,
      recipient_email: `${import.meta.env.VITE_EVBP_MUSIC_EMAILJS_RECIPIENT_EMAIL}`,
    };

    try {
      await emailjs.send(
        `${import.meta.env.VITE_EVBP_MUSIC_EMAILJS_SERVICE_ID}`,
        `${import.meta.env.VITE_EVBP_MUSIC_EMAILJS_TEMPLATE_ID}`,
        params,
        `${import.meta.env.VITE_EVBP_MUSIC_EMAILJS_PUBLIC_KEY}`,
      );
      alert("Message sent!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send message. Please try again later.");
    }

    clearForm();
  };

  return (
    <form className="contact-form" name="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        required
        type="email"
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
        onChange={(e) => setMessage(e.target.value)}
        required
        value={message}
      />
      <div
        className="cf-turnstile"
        data-sitekey={`${import.meta.env.VITE_EVBP_MUSIC_CLOUDFLARE_TURNSTILE_SITE_KEY}`}
      ></div>
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
