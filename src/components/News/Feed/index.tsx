import { FC } from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <meta
          name="description"
          content="Stay updated with the latest news and updates from EVBP. Read our latest posts and announcements."
        />
        <title>EVBPMusic.com | News Feed</title>
      </Helmet>
      {newsPosts.map((post) => (
        <Post key={post.slug} {...post} />
      ))}
    </section>
  );
};

export default NewsFeed;
