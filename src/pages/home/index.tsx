import NewRetroImageLoader from "../../components/RetroImageLoader";
import MenuButton from "../../components/MenuButton";
import ImageUnavailable from "../../components/ImageUnavailable";
import VisitorCounter from "../../components/VisitorCounter";
import React, {useEffect, useState} from "react";

const Home: React.FC = () => {
    const getImageWidth = (): number => {
        const width = window.innerWidth;

        switch (true) {
            case width <= 480:
                return 300;
            case width >= 480 && width < 768:
                return 450;
            case width >= 768 && width < 1024:
                return 600;
            default:
                return 800; // default width for larger screens
        }
    }
    const [imageWidth, setImageWidth] = useState(getImageWidth());

    useEffect(() => {
        const handleResize = () => {
            setImageWidth(getImageWidth());
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="page-container">
            <h1>Welcome to the official</h1>
            <NewRetroImageLoader
                alt="EVBP logo"
                height={150}
                src="/images/evbp_stereogram_logo_transparent_lo_rez.png"
                width={imageWidth}
            />
            <h1>Home Page</h1>

            <NewRetroImageLoader
                alt="EVBP profile picture"
                height={600}
                src="/images/1-horizontal-profile-grayscale-invert.png"
                width={imageWidth}
            />
            <div className="menu">
                <MenuButton text={"Home"} to="/" />
                <MenuButton text={"Bio"} to="/bio" />
                <MenuButton text={"Discography"} to="/music" />
                <MenuButton text={"Pics"} to="/pics" />
                <MenuButton text={"News"} to="/news" />
                <MenuButton text={"Links"} to="/links" />
            </div>
            <div data-testid="visit-counter-container">
                <VisitorCounter/>
            </div>
        </div>
    );
}

export default Home;