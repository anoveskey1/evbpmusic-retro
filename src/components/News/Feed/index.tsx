import { FC } from "react";
import Post from "../Post";
import INewsFeedProps from "./INewsFeedProps";

const NewsFeed: FC<INewsFeedProps> = (props: INewsFeedProps) => {
  const { newsPosts } = props;

  if (!newsPosts || newsPosts.length === 0) {
    return <div>No news posts available.</div>;
  }

  return (
    <section aria-label="News Feed" className="news-feed">
      {newsPosts.map((post) => (
        <Post key={post.slug} {...post} />
      ))}
    </section>
  );
};

export default NewsFeed;
