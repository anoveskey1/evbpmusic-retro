import React, {useEffect, useState} from "react";

import Navigation from "../../components/Navigation";
import PageContainer from "../../components/PageContainer";
import NewRetroImageLoader from "../../components/RetroImageLoader";
import VisitorCounter from "../../components/VisitorCounter";

import getLogoImageWidth from "./getLogoImageWidth";
import getPortraitImageWidth from "./getPortraitImageWidth";
import "./style.less";

const Home: React.FC = () => {
    const [logoImageWidth, setLogoImageWidth] = useState(getLogoImageWidth());
    const [portraitImageWidth, setPortraitImageWidth] = useState(getPortraitImageWidth());

    useEffect(() => {
        const handleResize = () => {
            setLogoImageWidth(getLogoImageWidth(window.innerWidth));
            setPortraitImageWidth(getPortraitImageWidth(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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

            <NewRetroImageLoader
                alt="EVBP profile picture"
                height={600}
                src="/images/1-horizontal-profile-grayscale-invert.png"
                width={portraitImageWidth}
            />
            <Navigation />
            <div data-testid="visit-counter-container">
                <VisitorCounter/>
            </div>
        </PageContainer>
    );
}

export default Home;