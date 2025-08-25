import { useEffect, useMemo, useState } from "react";
import INewsPost from "@typeDefs/INewsPost";
import newsPosts from "../../../public/evbp-blog-data.json";

const useLegacyNewsPosts = (slug?: string, getMostRecent?: boolean) => {
  const [posts, setPosts] = useState<INewsPost[]>([]);

  useEffect(() => {
    setPosts(newsPosts);
  }, []);

  const filteredPost = useMemo(() => {
    if (slug) {
      return newsPosts.find((post) => post.slug === slug) || null;
    }
    return null;
  }, [slug]);

  const mostRecentPost = useMemo(() => {
    if (getMostRecent) {
      return newsPosts.reduce((latest, current) => {
        return new Date(current.date) > new Date(latest.date)
          ? current
          : latest;
      }, newsPosts[0]);
    }
    return null;
  }, [getMostRecent]);

  if (slug) {
    return filteredPost;
  } else if (getMostRecent) {
    return mostRecentPost;
  } else {
    return posts;
  }
};

export default useLegacyNewsPosts;
