import { FC, useEffect, useState, useRef } from "react";

interface RetroImageLoaderProps {
  alt?: string;
  height?: number;
  src?: string;
  testId?: string;
  width?: number;
}

const RetroImageLoader: FC<RetroImageLoaderProps> = ({
  alt,
  height = 0,
  src,
  testId = "retro-image-loader",
  width = 0,
}) => {
  const [linesLoaded, setLinesLoaded] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalLines = 30;

  useEffect(() => {
    let currentLine = 0;

    const loadLine = () => {
      setLinesLoaded(currentLine);
      currentLine += 3;
      if (currentLine <= totalLines) {
        const randomDelay = 500 + Math.random() * 400;
        timerRef.current = setTimeout(loadLine, randomDelay);
      }
    };

    loadLine();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [totalLines]);

  const removeBorder = linesLoaded == totalLines;
  const revealPercentage = (linesLoaded / totalLines) * 100;

  return (
    <div
      data-testid={testId}
      style={{
        display: "inline-flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        height: `${height}px`,
        maxWidth: `${width}px`,
        backgroundColor: "inherit",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "visible",
          height: `${height}px`,
          maxWidth: `${width}px`,
          border: removeBorder ? "none" : "1px inset lightgray",
          background: "inherit",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: `${width}px`,
            width: `${width}px`,
            height: "100%",
            // objectFit: "cover",
            clipPath: `inset(0 0 ${100 - revealPercentage}% 0)`,
            transition: "clip-path 0.3s linear",
          }}
        />
      </div>
    </div>
  );
};

export default RetroImageLoader;
