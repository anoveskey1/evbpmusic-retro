import { FC, useState } from "react";
import { Helmet } from "react-helmet-async";
import INewsFeed from "@typeDefs/INewsFeed";
import Post from "../Post";
import "./style.less";
import Pagination from "@components/Pagination";

const NewsFeed: FC<INewsFeed> = (props: INewsFeed) => {
  const { newsPosts } = props;

  // pagination variables
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(newsPosts.length / ITEMS_PER_PAGE);

  // calculate the news posts to display based on the current page
  const paginatedOrder = newsPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

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
      {paginatedOrder.map((post) => (
        <Post key={post.slug} {...post} />
      ))}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
      />
    </section>
  );
};

export default NewsFeed;
