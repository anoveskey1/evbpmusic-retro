import sanityClient from "@/services/sanity/sanityClient";
import { useEffect, useState } from "react";
import { GalleryImageDoc } from "@/types";

function useSanityImages() {
  const [imageDocs, setImageDocs] = useState<GalleryImageDoc[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const sanityImagesQuery = `*[_type == "galleryImage"]{ alt, _id, image{asset}, name }`;
        const results = await sanityClient.fetch(sanityImagesQuery);

        setImageDocs(results ?? []);
      } catch (error) {
        console.error("Failed to fetch images from Sanity:", error);
        setImageDocs([]);
      }
    };

    void fetchImages();
  }, []);

  return imageDocs;
}

export default useSanityImages;
