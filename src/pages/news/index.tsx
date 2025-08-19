import NewsFeed from "@components/News/Feed";
import PageContainer from "@components/PageContainer";
import PageIntro from "@components/PageIntro";
import { useNewsPosts } from "@hooks";
import INewsPost from "@typeDefs/INewsPost";

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
