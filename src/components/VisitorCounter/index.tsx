import { FC, memo, useEffect, useMemo, useState } from "react";
import "./style.less";

const VisitorCounter: FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);

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
        <span>You are visitor</span>
        &nbsp;
        <span className="ticker">{paddedCount}</span>
        &nbsp;
        <span>to the site. Welcome!</span>
      </p>
    </div>
  );
};

export default memo(VisitorCounter);
