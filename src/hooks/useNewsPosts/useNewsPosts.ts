import { useEffect, useState } from "react";
import INewsPost from "@/types/INewsPost";

const apiVersion = process.env.VITE_EVBP_MUSIC_SANITY_API_VERSION;
const dataset = process.env.VITE_EVBP_MUSIC_SANITY_DATASET;
const projectId = process.env.VITE_EVBP_MUSIC_SANITY_PROJECT_ID;

function useNewsPosts() {
  const [posts, setPosts] = useState<INewsPost[]>([]);

  // fetch posts and assign them to posts state
  useEffect(() => {
    const controller = new AbortController();

    const getNewsPosts = async (): Promise<INewsPost[]> => {
      const query = encodeURIComponent(`
        *[_type == "post"] | order(_createdAt desc){
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
      }`);

      const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching blog posts: ${errorData.message}`);
      }

      const data = await response.json();
      return data.result;
    };

    getNewsPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Unexpected fetch error:", error);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return posts;
}

export default useNewsPosts;
