import { FC } from "react";
import { Helmet } from "react-helmet";
import tagMappings from "../../../constants/tagMappings";
import INewsPost from "../../../types/INewsPost";

const Post: FC<INewsPost> = (props: INewsPost) => {
  const { body, date, header, images, metaTags, slug } = props;
  const dateStringToDate = new Date(date);
  const formattedDate = Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(dateStringToDate);

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`https://evbpmusic.com/news/${slug}`} />
        <meta name="keywords" content={metaTags?.join(", ") || ""} />
      </Helmet>
      <article className="news-post">
        {images && images.length > 0 && (
          <img
            alt={`${header} post image 1`}
            className="news-post-image"
            src={images[0]}
          />
        )}
        <header>
          <h2>{header}</h2>
          <time dateTime={dateStringToDate.toISOString()}>{formattedDate}</time>
        </header>
        <section>{body}</section>
        <footer>
          {metaTags?.map((tag) => <span key={tag}>{tagMappings[tag]}</span>)}
        </footer>
      </article>
    </>
  );
};

export default Post;
