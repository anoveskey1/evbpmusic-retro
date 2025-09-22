import { FC } from "react";
import "./style.less";

interface IPageIntro {
  description?: string;
  header: string;
}

const PageIntro: FC<IPageIntro> = (props: IPageIntro) => {
  const { description, header } = props;

  return (
    <>
      <h1 className="page-intro-header">{header}</h1>
      {description && <p className="page-intro-description">{description}</p>}
    </>
  );
};

export default PageIntro;
