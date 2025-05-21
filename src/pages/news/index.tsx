import NewsFeed from "../../components/News/Feed";
import PageContainer from "../../components/PageContainer";
import { useNewsPosts } from "../../hooks";
import INewsPost from "../../types/INewsPost";

const News = () => {
  const rawNewsPosts = useNewsPosts();
  const newsPosts: INewsPost[] = Array.isArray(rawNewsPosts)
    ? rawNewsPosts
    : [];

  return (
    <PageContainer>
      <h1>News</h1>
      <NewsFeed newsPosts={newsPosts} />
    </PageContainer>
  );
};

export default News;
