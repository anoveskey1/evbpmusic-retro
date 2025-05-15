import { FC, ReactNode } from "react";
import "./style.less";
import NavigationButtons from "../NavigationButtons";

interface IPageContainerProps {
  children: ReactNode;
}

const PageContainer: FC<IPageContainerProps> = ({ children }) => {
  const isRootPath = window.location.pathname === "/";

  return (
    <div className="page-container">
      {!isRootPath && <NavigationButtons />}
      <div className="page-container-content">{children}</div>
    </div>
  );
};

export default PageContainer;
