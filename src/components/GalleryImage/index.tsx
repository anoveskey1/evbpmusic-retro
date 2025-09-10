import { FC } from "react";
import { useParams, Link } from "react-router-dom";
import ImageUnavailable from "@components/ImageUnavailable";
import RetroImageLoader from "@components/RetroImageLoader";
import { useSanityImage } from "@hooks";
import { urlFor } from "@services/sanity";

const GalleryImage: FC = () => {
  const { imageId } = useParams();
  const imageDoc = useSanityImage(imageId!);

  // const builder = imageUrlBuilder(sanityClient);
  // const urlFor = (source: any) => builder.image(source);

  return (
    <div className="gallery-image-container">
      <Link to="/gallery">← Back to Gallery</Link>
      <br />
      {imageDoc ? (
        <RetroImageLoader
          alt={imageDoc.alt}
          src={urlFor(imageDoc.image).url()}
        />
      ) : (
        <ImageUnavailable />
      )}
    </div>
  );
};

export default GalleryImage;
