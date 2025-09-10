import { FC } from "react";
import { Link } from "react-router-dom";
import { useSanityImages, useWindowWidth } from "@hooks";
import { urlFor } from "@services/sanity";
import { GalleryImageDoc } from "@/types";
import "./style.less";

const GalleryContainer: FC = () => {
  const images: GalleryImageDoc[] = useSanityImages();
  const IMAGE_GALLERY_THUMBNAIL_BREAK_POINT: number = 520;
  const screenWidth: number = useWindowWidth();

  const getThumbnailWidth = (width: number) => {
    return width < IMAGE_GALLERY_THUMBNAIL_BREAK_POINT ? 50 : 100;
  };

  const chunkArray = (array: GalleryImageDoc[], size: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  };

  return (
    <section aria-label="Image Gallery" className="gallery-container">
      {chunkArray(images, 4).map((imageRow, rowIndex) => (
        <div className="gallery-row" key={rowIndex}>
          {imageRow.map((image) => (
            <div key={image._id} className="gallery-item">
              <Link to={`/gallery/${image.name}`}>
                <img
                  alt={image.alt}
                  className="gallery-thumbnail"
                  src={urlFor(image.image)
                    .width(getThumbnailWidth(screenWidth))
                    .height(100)
                    .fit("crop")
                    .url()}
                />
              </Link>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default GalleryContainer;
