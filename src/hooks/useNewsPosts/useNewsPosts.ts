import { useEffect, useMemo, useState } from "react";
import INewsPost from "@/types/INewsPost";

const apiVersion = process.env.VITE_EVBP_MUSIC_SANITY_API_VERSION;
const dataset = process.env.VITE_EVBP_MUSIC_SANITY_DATASET;
const projectId = process.env.VITE_EVBP_MUSIC_SANITY_PROJECT_ID;

function useNewsPosts(slug?: string, getMostRecent?: boolean) {
  const [posts, setPosts] = useState<INewsPost[]>([]);

  // fetch posts and assign them to posts state
  useEffect(() => {
    const controller = new AbortController();

    const getNewsPosts = async (): Promise<INewsPost[]> => {
      const query = encodeURIComponent(
        '*[_type == "post"] | order(_createdAt desc)',
      );
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

  const filteredPost = useMemo(() => {
    if (slug) {
      return posts.find((post) => post.slug === slug) || null;
    }
    return null;
  }, [posts, slug]);

  const mostRecentPost = useMemo(() => {
    if (getMostRecent) {
      return posts.reduce((latest, current) => {
        return new Date(current.date) > new Date(latest.date)
          ? current
          : latest;
      }, posts[0]);
    }
    return null;
  }, [getMostRecent, posts]);

  // return based on parameters
  if (slug) {
    return filteredPost;
  } else if (getMostRecent) {
    return mostRecentPost;
  } else {
    return posts;
  }
}

export default useNewsPosts;
