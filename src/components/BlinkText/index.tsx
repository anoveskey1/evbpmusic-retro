import { FC, useState, useEffect, useRef, useCallback } from "react";

interface BlinkTextProps {
  isBold?: boolean;
  fontColor?: string;
  fontSize?: number;
  testId?: string;
  text: string;
}

const BlinkText: FC<BlinkTextProps> = ({
  isBold = false,
  fontColor = "black",
  fontSize = 14,
  testId = "blink-text",
  text,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(toggleVisibility, 500); // Toggle every half second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [toggleVisibility]);

  return (
    <div
      data-testid={testId}
      style={{
        color: fontColor,
        fontSize: `${fontSize}px`,
        fontWeight: isBold ? "bold" : "normal",
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      {text}
    </div>
  );
};

export default BlinkText;
