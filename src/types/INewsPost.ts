interface INewsPost {
  body: string;
  date: string;
  header: string;
  images?: string[];
  isSlugPost?: boolean;
  metaTags?: number[];
  slug: string;
}

export default INewsPost;
