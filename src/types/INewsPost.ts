import { Image } from "./image";
import { MetaTag } from "./metaTag";
import IBasePost from "@/types/IBasePost";

interface ISlug {
  _type: string;
  current: string;
}

interface INewsPost extends IBasePost {
  images?: Image[];
  metaTags?: MetaTag[];
  slug: ISlug;
}

export default INewsPost;
