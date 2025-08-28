import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import INewsPost from "@typeDefs/INewsPost";
import tagMappings from "../../../constants/tagMappings";
import preprocessBody from "./functions/preprocessBody";
import "./style.less";
import { MetaTag } from "@/types/metaTag";
import ILegacyNewsPost from "@/types/ILegacyNewsPost";

const Post: FC<ILegacyNewsPost | INewsPost> = (
  props: ILegacyNewsPost | INewsPost,
) => {
  const { body, date, header, isSlugPost, metaTags, slug } = props;

  const isLegacyPost = (
    post: ILegacyNewsPost | INewsPost,
  ): post is ILegacyNewsPost => typeof post.slug === "string";
  const images = !isLegacyPost(props) ? props.images : [];

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
  const formatMetaKeywords = (metaTags: number[] | MetaTag[]): string => {
    return metaTags
      ?.map((tag) => (typeof tag === "number" ? tagMappings[tag] : tag.label))
      .join(", ");
  };
  const renderMetaTag = (tag: number | MetaTag) => {
    if (typeof tag === "number") {
      return (
        <span className="meta-tag" key={tag}>
          {tagMappings[tag]}
        </span>
      );
    } else {
      return (
        <span className="meta-tag" key={tag.id}>
          {tag.label}
        </span>
      );
    }
  };

  return (
    <>
      {isSlugPost && (
        <Helmet>
          <link rel="canonical" href={`https://evbpmusic.com/news/${slug}`} />
          {metaTags && (
            <meta content={formatMetaKeywords(metaTags)} name="keywords" />
          )}
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
          {metaTags?.map((tag) => renderMetaTag(tag))}
        </footer>
      </article>
    </>
  );
};

export default Post;
