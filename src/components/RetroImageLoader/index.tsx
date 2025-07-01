import { FC, useEffect, useState, useRef, useMemo } from "react";
import IRetroImageLoader from "../../types/IRetroImageLoader";

const RetroImageLoader: FC<IRetroImageLoader> = ({
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

  const imageStyle = useMemo(
    () => ({
      border: removeBorder ? "none" : "1px ridge lightgray",
      clipPath: `inset(0 0 ${100 - revealPercentage}% 0)`,
      transition: "clip-path 0.3s linear",
    }),
    [removeBorder, revealPercentage],
  );

  return width !== 0 && height !== 0 ? (
    <img
      alt={alt}
      data-testid={testId}
      src={src}
      style={{
        ...imageStyle,
        height: `${height}px`,
        width: `${width}px`,
      }}
    />
  ) : (
    <img alt={alt} data-testid={testId} src={src} style={imageStyle} />
  );
};

export default RetroImageLoader;
