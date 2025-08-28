import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ILegacyNewsPost from "@/types/ILegacyNewsPost";
import INewsPost from "@typeDefs/INewsPost";
import Post from "../Post";
import { useLegacyPost, useNewsPost } from "@hooks";

const SlugPost = () => {
  const { slug } = useParams();
  const legacyPost: ILegacyNewsPost | null = useLegacyPost(slug ?? "");
  const newsPost: INewsPost | null = useNewsPost(slug ?? "");
  const [post, setPost] = useState<INewsPost | ILegacyNewsPost | null>();

  useEffect(() => {
    if (newsPost) {
      setPost(newsPost);
    } else if (legacyPost) {
      setPost(legacyPost);
    } else {
      setPost(null);
    }
  }, [legacyPost, newsPost, slug]);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <Post {...post} isSlugPost />;
};

export default SlugPost;
