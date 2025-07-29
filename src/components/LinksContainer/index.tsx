import React from "react";
import { ILinkContainer } from "../../types/links";
import "./style.less";

const LinksContainer: React.FC<ILinkContainer> = (props: ILinkContainer) => {
  const { header, links } = props;

  return (
    <>
      <h2>{header}</h2>
      <ul className="links">
        {links.map((link) => (
          <li key={link.name}>
            <p dangerouslySetInnerHTML={{ __html: link.content }} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default LinksContainer;
