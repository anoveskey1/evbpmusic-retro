import { useEffect, useState } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize(); // call once to prevent stale value on mount

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default useWindowWidth;
