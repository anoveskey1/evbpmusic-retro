import { useParams } from "react-router-dom";
import Post from "../Post";
import INewsPostProps from "../Post/INewsPostProps";

const SlugPost = () => {
  const { slug } = useParams();
  const post = posts.find((post: INewsPostProps) => post.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <Post {...post} />;
};

export default SlugPost;
