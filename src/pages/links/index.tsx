import React from "react";
import { Helmet } from "react-helmet-async";
import PageContainer from "@components/PageContainer";
import PageIntro from "@components/PageIntro";
import LinksContainer from "@components/LinksContainer";
import { ILink } from "@typeDefs/links";
import links from "./links.json";

const Links: React.FC = () => {
  const relatedLinks: ILink[] = links["EVBPRelatedLinks"];
  const unrelatedLinks: ILink[] = links["NonEVBPRelatedLinks"];

  return (
    <PageContainer>
      <Helmet>
        <meta
          name="description"
          content="Links related to EVBP and other cool internet things."
        />
        <title>EVBPMusic.com | Links</title>
      </Helmet>
      <PageIntro
        description="The internet is a wonderful place. Full of hyperlinks, memes, and other things to waste your afternoon with. Here are some internet things that I thought were worth your attention."
        header="Links"
      />
      <LinksContainer header={"EVBP Related"} links={relatedLinks} />
      <LinksContainer header={"EVBP-Free Content"} links={unrelatedLinks} />
    </PageContainer>
  );
};

export default Links;
