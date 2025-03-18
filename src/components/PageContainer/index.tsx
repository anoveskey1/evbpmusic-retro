import React, { ReactNode } from "react";
import "./style.less";

interface IPageContainerProps {
    children: ReactNode;
}

const PageContainer: React.FC<IPageContainerProps> = ({ children }) => {
    return (
        <div className="page-container">
            <div className="page-container-content">
                {children}
            </div>
        </div>
    );
}

export default PageContainer;