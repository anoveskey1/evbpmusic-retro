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

  return width !== 0 && height !== 0 ? (
    <img
      alt={alt}
      data-testid={testId}
      src={src}
      style={{
        border: removeBorder ? "none" : "1px ridge white",
        clipPath: `inset(0 0 ${100 - revealPercentage}% 0)`,
        height: `${height}px`,
        transition: "clip-path 0.3s linear",
        width: `${width}px`,
      }}
    />
  ) : (
    <img
      alt={alt}
      data-testid={testId}
      src={src}
      style={{
        border: removeBorder ? "none" : "1px ridge white",
        clipPath: `inset(0 0 ${100 - revealPercentage}% 0)`,
        transition: "clip-path 0.3s linear",
      }}
    />
  );
};

export default RetroImageLoader;
