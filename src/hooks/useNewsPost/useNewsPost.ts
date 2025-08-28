import { useEffect, useState } from "react";
import INewsPost from "@/types/INewsPost";

const apiVersion = process.env.VITE_EVBP_MUSIC_SANITY_API_VERSION;
const dataset = process.env.VITE_EVBP_MUSIC_SANITY_DATASET;
const projectId = process.env.VITE_EVBP_MUSIC_SANITY_PROJECT_ID;

function useNewsPost(slug: string): INewsPost | null {
  const [post, setPost] = useState<INewsPost | null>(null);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    const query = encodeURIComponent(`
      *[_type == "post" && slug.current == $slug][0]{
        _id,
        header,
        slug,
        date,
        body,
        images,
        metaTags[]->{
          _id,
          id,
          label
        }
      }
    `);

    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}&$slug="${slug}"`;

    fetch(url, {
      method: "GET",
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data.result ?? null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error fetching single post:", err);
        }
      });

    return () => controller.abort();
  }, [slug]);

  return post;
}

export default useNewsPost;
