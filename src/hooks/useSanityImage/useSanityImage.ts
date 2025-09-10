import sanityClient from "@/services/sanity/sanityClient";
import { useEffect, useState } from "react";
import { GalleryImageDoc } from "@/types";

function useSanityImage(imageId: string) {
  const [imageDoc, setImageDoc] = useState<GalleryImageDoc | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const sanityImageQuery = `*[_type == "galleryImage" && name == $name][0]{image{asset}, alt}`;
        const params = { name: imageId };
        const result = await sanityClient.fetch(sanityImageQuery, params);

        setImageDoc(result ?? null);
      } catch (error) {
        console.error("Failed to fetch image from Sanity:", error);
        setImageDoc(null);
      }
    };

    if (imageId) {
      void fetchImage();
    }
  }, [imageId]);

  return imageDoc;
}

export default useSanityImage;
