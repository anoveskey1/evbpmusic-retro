import React from 'react';
import './style.less';

const imageUnavailableAltText = "The linked image cannot be displayed. The file may have been moved, renamed, or deleted. Verify that the link points to the correct file and location.";

interface ImageUnavailableProps {
    src?: string;
    width?: number;
}

const ImageUnavailable: React.FC<ImageUnavailableProps> = (
    {
        src = "/images/image_unavailable.PNG",
        width = 0
    }) => (
    <div className="image-container-unavailable" style={{ width: `${width}px` }}>
        <img
            alt={imageUnavailableAltText}
            className="image-element"
            src={src}
        />
    </div>
);

export default ImageUnavailable;