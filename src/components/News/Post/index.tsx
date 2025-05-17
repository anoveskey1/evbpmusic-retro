import { FC } from "react";
import { Helmet } from "react-helmet";
import INewsPostProps from "./INewsPostProps";

const Post: FC<INewsPostProps> = (props: INewsPostProps) => {
  const { body, date, header, images, metaTags, slug } = props;
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://evbpmusic.com/news/${slug}`} />
        <meta name="keywords" content={metaTags?.join(", ") || ""} />
      </Helmet>
      <article className="news-post">
        {images && images.length > 0 && (
          <img
            className="news-post-image"
            src={images[0]}
            alt={`${header} post image 1`}
          />
        )}
        <header>
          <h2>{header}</h2>
          <time dateTime={date.toISOString()}>{formattedDate}</time>
        </header>
        <section>{body}</section>
        <footer>{metaTags?.map((tag) => <span key={tag}>{tag}</span>)}</footer>
      </article>
    </>
  );
};

export default Post;
