import { useEffect, useState } from "react";
import INewsPost from "@/types/INewsPost";

const apiVersion = process.env.VITE_EVBP_MUSIC_SANITY_API_VERSION;
const dataset = process.env.VITE_EVBP_MUSIC_SANITY_DATASET;
const projectId = process.env.VITE_EVBP_MUSIC_SANITY_PROJECT_ID;

function useMostRecentNewsPost(): INewsPost | null {
  const [post, setPost] = useState<INewsPost | null>(null);

  useEffect(() => {
    const query = encodeURIComponent(`
      *[_type == "post"] | order(date desc)[0] {
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

    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.result ?? null);
      })
      .catch((err) => {
        console.error("Error fetching most recent post:", err);
        setPost(null);
      });
  }, []);

  return post;
}

export default useMostRecentNewsPost;
