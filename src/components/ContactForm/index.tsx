import { useState } from "react";
import { SUBJECT_OPTIONS } from "./emailSubjectOptions";
import "./index.less";

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>(SUBJECT_OPTIONS[0].value);
  const [message, setMessage] = useState<string>("");

  const clearForm = () => {
    setEmail("");
    setSubject(SUBJECT_OPTIONS[0].value);
    setMessage("");
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("Message sent!");
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
