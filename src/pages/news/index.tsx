import NewsFeed from "@components/News/Feed";
import PageContainer from "@components/PageContainer";
import PageIntro from "@components/PageIntro";
import { useLegacyNewsPosts, useNewsPosts } from "@hooks";
import { NewsPost } from "@/types/INewsFeed";

const News = () => {
  const legacyNewsPosts = useLegacyNewsPosts();
  const currentPosts = useNewsPosts();

  const newsPosts: NewsPost[] =
    Array.isArray(legacyNewsPosts) && Array.isArray(currentPosts)
      ? [...currentPosts, ...legacyNewsPosts]
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
