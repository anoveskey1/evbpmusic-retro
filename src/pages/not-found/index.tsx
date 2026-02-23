import { FC } from "react";
import { Link } from "react-router-dom";
import "@/styles/error-page.less";

const NotFound: FC = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>
        The requested URL <strong>{window.location.pathname}</strong> was not
        found on this server.
      </p>
      <p>
        Click <Link to="/">here</Link> to return home.
      </p>
      <hr />
    </div>
  );
};

export default NotFound;
