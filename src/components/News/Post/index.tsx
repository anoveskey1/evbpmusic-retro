import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import ImageUnavailable from "../../ImageUnavailable";
import tagMappings from "../../../constants/tagMappings";
import INewsPost from "../../../types/INewsPost";
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

  // preprocess the body to replace images with <ImageUnavailable />
  const preprocessBody = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const children: React.ReactNode[] = [];
    doc.body.childNodes.forEach((node) => {
      if (node.nodeName === "FIGURE") {
        children.push(<ImageUnavailable key={children.length} width={50} />);
      } else {
        children.push(
          <div
            dangerouslySetInnerHTML={{
              __html: node instanceof Element ? node.outerHTML : "",
            }}
            key={children.length}
          />,
        );
      }
    });

    return children;
  };

  const processedBody = preprocessBody(body);

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
