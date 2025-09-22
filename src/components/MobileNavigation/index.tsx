import { FC } from "react";
import MenuButton from "@components/MenuButton";
import "./style.less";

const MobileNavigation: FC = () => {
  return (
    <div className="menu">
      <MenuButton text={"bio"} to="/bio" />
      <MenuButton text={"music"} to="/music" />
      <MenuButton text={"gallery"} to="/gallery" />
      <MenuButton text={"news"} to="/news" />
      <MenuButton text={"faq"} to="/faq" />
      <MenuButton text={"guestbook"} to="/guestbook" />
      <MenuButton text={"links"} to="/links" />
      <MenuButton text={"contact"} to="/contact" />
    </div>
  );
};

export default MobileNavigation;
