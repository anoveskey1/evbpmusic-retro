import { FC } from "react";
import MenuButton from "../MenuButton";
import ButtonWrapper from "../ButtonWrapper";
import "./style.less";

const MobileNavigation: FC = () => {
  const isRootPath = window.location.pathname === "/";


  return (
    <div className="menu">
      {!isRootPath && <MenuButton text={"home"} to="/" />}
      <MenuButton text={"faq"} to="/faq" />
      <MenuButton text={"bio"} to="/bio" />
      <MenuButton text={"discography"} to="/music" />
      <MenuButton text={"pics"} to="/pics" />
      <MenuButton text={"news"} to="/news" />
      <MenuButton text={"links"} to="/links" />
      <MenuButton text={"guestbook"} to="/guestbook" />
      <MenuButton text={"contact"} to="/contact" />
    </div>
  );
};

export default MobileNavigation;
