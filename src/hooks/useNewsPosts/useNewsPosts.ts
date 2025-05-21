import { useEffect, useState } from "react";
import newsPosts from "../../../public/evbp-blog-data.json";
import INewsPost from "../../types/INewsPost";

const useNewsPosts = (slug?: string, getMostRecent?: boolean) => {
  const [posts, setPosts] = useState<INewsPost[]>([]);
  const [filteredPost, setFilteredPost] = useState<INewsPost | null>(null);
  const [mostRecentPost, setMostRecentPost] = useState<INewsPost | null>(null);

  useEffect(() => {
    setPosts(newsPosts);

    if (slug) {
      const post = newsPosts.find((post) => post.slug === slug) || null;
      setFilteredPost(post);
    } else if (getMostRecent) {
      const recentPost = newsPosts.reduce((latest, current) => {
        return new Date(current.date) > new Date(latest.date)
          ? current
          : latest;
      }, newsPosts[0]);
      setMostRecentPost(recentPost);
    }
  }, [slug, getMostRecent]);

  if (slug) {
    return filteredPost;
  } else if (getMostRecent) {
    return mostRecentPost;
  } else {
    return posts;
  }
};

export default useNewsPosts;
