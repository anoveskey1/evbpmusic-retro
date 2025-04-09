import { FC } from "react";
import "./style.less";

const imageUnavailableAltText =
  "The linked image cannot be displayed. The file may have been moved, renamed, or deleted. Verify that the link points to the correct file and location.";

interface ImageUnavailableProps {
  src?: string;
  testId?: string;
  width?: number;
}

const ImageUnavailable: FC<ImageUnavailableProps> = ({
  src = "/images/image_unavailable.PNG",
  testId = "image-unavailable",
  width = 0,
}) => (
  <div
    className="image-container-unavailable"
    data-testid={testId}
    style={{ width: `${width}px` }}
  >
    <img alt={imageUnavailableAltText} className="image-element" src={src} />
  </div>
);

export default ImageUnavailable;
