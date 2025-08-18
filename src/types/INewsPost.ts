import Image from "./image";

interface INewsPost {
  body: string;
  date: string;
  header: string;
  images?: Image[];
  isSlugPost?: boolean;
  metaTags?: number[];
  slug: string;
}

export default INewsPost;
