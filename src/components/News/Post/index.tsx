import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import INewsPost from "@typeDefs/INewsPost";
import tagMappings from "../../../constants/tagMappings";
import preprocessBody from "./functions/preprocessBody";
import "./style.less";

const Post: FC<INewsPost> = (props: INewsPost) => {
  const { body, date, header, images, isSlugPost, metaTags, slug } = props;

  // format the date
  const dateStringToDate = new Date(date);
  const formattedDate = Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(dateStringToDate);

  const processedBody = preprocessBody(body, images);

  return (
    <>
      {isSlugPost && (
        <Helmet>
          <link rel="canonical" href={`https://evbpmusic.com/news/${slug}`} />
          <meta
            name="keywords"
            content={metaTags?.map((tag) => tagMappings[tag]).join(", ") || ""}
          />
          <title>EVBPMusic.com | News | {header}</title>
        </Helmet>
      )}
      <article className="news-post">
        <header>
          <h2>{header}</h2>
          <time dateTime={dateStringToDate.toISOString()}>{formattedDate}</time>
        </header>
        <section className="news-post-body">{processedBody}</section>
        <footer>
          {metaTags && metaTags.length > 0 && <h3>Tags:</h3>}
          {metaTags?.map((tag) => (
            <span className="meta-tag" key={tag}>
              {tagMappings[tag]}
            </span>
          ))}
        </footer>
      </article>
    </>
  );
};

export default Post;
