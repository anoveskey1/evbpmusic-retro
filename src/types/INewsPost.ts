interface INewsPost {
  body: string;
  date: string;
  header: string;
  images?: string[];
  metaTags?: number[];
  slug: string;
}

export default INewsPost;
