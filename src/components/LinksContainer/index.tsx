import React from "react";
import { ILinkContainer } from "@typeDefs/links";
import "./style.less";

const LinksContainer: React.FC<ILinkContainer> = (props: ILinkContainer) => {
  const { header, links } = props;
  const idTag = header.toLowerCase().replace(/\s/g, "-");

  return (
    <section className="links" id={idTag}>
      <h2>{header}:</h2>
      <ul>
        {links.map((link) => (
          <li key={link.name}>
            <p dangerouslySetInnerHTML={{ __html: link.content }} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LinksContainer;
