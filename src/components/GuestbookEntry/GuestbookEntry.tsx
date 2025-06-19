import IGuestbookEntry from "../../types/IGuestbookEntry";
import "./style.less";

const GuestbookEntry = (props: IGuestbookEntry) => {
  const { username, message } = props;

  return (
    <article className="guestbook-entry">
      <div className="guestbook-entry-header">
        <h3>{username} wrote:</h3>
      </div>
      <div className="guestbook-entry-content">
        <p>{message}</p>
      </div>
    </article>
  );
};

export default GuestbookEntry;
