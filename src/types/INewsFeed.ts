import INewsPost from "./INewsPost";
import ILegacyNewsPost from "./ILegacyNewsPost";

type NewsPost = INewsPost | ILegacyNewsPost;

interface INewsFeed {
  newsPosts: NewsPost[];
}

export default INewsFeed;
export type { NewsPost };
