import NewsFeed from "../../components/News/Feed";
import PageContainer from "../../components/PageContainer";
import { useNewsPosts } from "../../hooks";
import INewsPost from "../../types/INewsPost";
import PageIntro from "../../components/PageIntro";

const News = () => {
  const rawNewsPosts = useNewsPosts();
  const newsPosts: INewsPost[] = Array.isArray(rawNewsPosts)
    ? rawNewsPosts
    : [];

  return (
    <PageContainer>
      <PageIntro
        description="All the news that's unfit for human consumption!"
        header="News"
      />
      <NewsFeed newsPosts={newsPosts} />
    </PageContainer>
  );
};

export default News;
