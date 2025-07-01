import { FC, useEffect, useMemo, useState } from "react";
import "./style.less";

const VisitorCounter: FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  // TODO: Need to figure out an effective way to prevent the visitor
  //  count from updating every time the page refreshes; possibly using
  //  cookies, session storage, or an api call

  useEffect(() => {
    const controller = new AbortController();

    const fetchVisitorCount = () => {
      fetch(`${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/visitor-count`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setVisitorCount(data.count);
        })
        .catch((error) => console.error("Fetch error: ", error));
    };

    fetchVisitorCount();

    return () => {
      controller.abort();
    };
  }, []);

  const paddedCount = useMemo(
    () => String(visitorCount).padStart(8, "0"),
    [visitorCount],
  );

  return (
    <div>
      <p className="visitor-counter-text">
        <span>You are visitor #</span>
        <span className="ticker">{paddedCount}</span>
        &nbsp;
        <span>to the site. Welcome!</span>
      </p>
    </div>
  );
};

export default VisitorCounter;
