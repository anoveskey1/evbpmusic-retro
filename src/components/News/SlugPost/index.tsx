import { useParams } from "react-router-dom";
import { useNewsPosts } from "../../../hooks";
import INewsPost from "../../../types/INewsPost";
import Post from "../Post";

const SlugPost = () => {
  const { slug } = useParams();
  const post: INewsPost | INewsPost[] | null = useNewsPosts(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  if (Array.isArray(post)) {
    // This should absolutely not happen, but useNewsPosts is capable of returning an array of posts, so...
    throw new Error(
      "Unexpected data type: SlugPost received an array of posts.",
    );
  }

  return <Post {...post} isSlugPost />;
};

export default SlugPost;
