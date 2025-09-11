import React, { useEffect, useState } from "react";

import MenuButton from "@components/MenuButton";
import Navigation from "@components/MobileNavigation";
import PageContainer from "@components/PageContainer";
import NewRetroImageLoader from "@components/RetroImageLoader";

import VisitorCounter from "@components/VisitorCounter";
import { useWindowWidth } from "@hooks";
import getLogoImageWidth from "./getLogoImageWidth";
import getPortraitImageWidth from "./getPortraitImageWidth";
import "./style.less";

const Home: React.FC = () => {
  const [logoImageWidth, setLogoImageWidth] = useState(getLogoImageWidth());
  const [portraitImageWidth, setPortraitImageWidth] = useState(
    getPortraitImageWidth(),
  );
  const screenWidth = useWindowWidth();

  useEffect(() => {
    setLogoImageWidth(getLogoImageWidth(screenWidth));
    setPortraitImageWidth(getPortraitImageWidth(screenWidth));
  }, [screenWidth]);

  return (
    <PageContainer>
      <h1>
        <span>Welcome to the</span>
        <NewRetroImageLoader
          alt="EVBP"
          height={150}
          src="/images/evbp-logo-white-lorez.png"
          width={logoImageWidth}
        />
        <span>Home Page</span>
      </h1>

      <div className="home-content">
        <div
          className="desktop-nav-menu nav-left"
          data-testid="desktop-nav-menu-left"
        >
          <MenuButton text={"faq"} to="/faq" />
          <MenuButton text={"bio"} to="/bio" />
          <MenuButton text={"music"} to="/music" />
          <MenuButton text={"gallery"} to="/gallery" />
        </div>
        <div className="profile-center">
          <NewRetroImageLoader
            alt="EVBP profile picture"
            height={600}
            src="/images/1-horizontal-profile-grayscale-invert.png"
            width={portraitImageWidth}
          />
        </div>
        <div
          className="desktop-nav-menu nav-right"
          data-testid="desktop-nav-menu-right"
        >
          <MenuButton text={"news"} to="/news" />
          <MenuButton text={"links"} to="/links" />
          <MenuButton text={"guestbook"} to="/guestbook" />
          <MenuButton text={"contact"} to="/contact" />
        </div>
      </div>
      <div className="mobile-nav-menu" data-testid="mobile-nav-menu">
        <Navigation />
      </div>
      <footer data-testid="visit-counter-container">
        <VisitorCounter />
      </footer>
    </PageContainer>
  );
};

export default Home;
