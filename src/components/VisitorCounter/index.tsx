import { FC, useEffect, useState } from "react";

const VisitorCounter: FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/visitor-count`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setVisitorCount(data.count))
      .catch((error) => console.error("Fetch error: ", error));
  }, []);

  const paddedCount = String(visitorCount).padStart(8, "0");

  return (
    <div>
      <p style={{ color: "black", fontFamily: "monospace" }}>
        You are visitor #
        <span
          style={{
            backgroundColor: "black",
            color: "white",
            fontWeight: "bold",
            padding: "5px",
            fontFamily: "monospace",
          }}
        >
          {paddedCount}
        </span>
        to the site. Welcome!
      </p>
    </div>
  );
};

export default VisitorCounter;
