import MenuButton from "../MenuButton";
import React from "react";

const Navigation: React.FC = () => {
    const isRootPath = window.location.pathname === "/";

    return (
        <div className="menu">
            {!isRootPath && <MenuButton text={"Home"} to="/"/>}
            <MenuButton text={"FAQ"} to="/faq"/>
            <MenuButton text={"Bio"} to="/bio"/>
            <MenuButton text={"Discography"} to="/music"/>
            <MenuButton text={"Pics"} to="/pics"/>
            <MenuButton text={"News"} to="/news"/>
            <MenuButton text={"Links"} to="/links"/>
            <MenuButton text={"Guestbook"} to="/guestbook"/>
            <MenuButton text={"Contact"} to="/contact"/>
        </div>
    );
}

export default Navigation;