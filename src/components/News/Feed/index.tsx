import { FC } from "react";
import Post from "../Post";
import INewsFeed from "../../../types/INewsFeed";
import "./style.less";

const NewsFeed: FC<INewsFeed> = (props: INewsFeed) => {
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
