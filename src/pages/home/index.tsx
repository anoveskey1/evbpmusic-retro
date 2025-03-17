import NewRetroImageLoader from "../../components/RetroImageLoader";
import VisitorCounter from "../../components/VisitorCounter";
import React, {useEffect, useState} from "react";
import getLogoImageWidth from "./getLogoImageWidth";
import getPortraitImageWidth from "./getPortraitImageWidth";
import Navigation from "../../components/Navigation";

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
        <div className="page-container">
            <h1>Welcome to the
            <NewRetroImageLoader
                alt="EVBP"
                height={150}
                src="/images/evbp-logo-white-lorez.png"
                width={logoImageWidth}
            />
            Home Page</h1>

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
        </div>
    );
}

export default Home;