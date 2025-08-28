import IBasePost from "@/types/IBasePost";

interface ILegacyNewsPost extends IBasePost {
  metaTags?: number[];
  slug: string;
}

export default ILegacyNewsPost;
