import NewRetroImageLoader from "../../components/RetroImageLoader";
import MenuButton from "../../components/MenuButton";
import ImageUnavailable from "../../components/ImageUnavailable";
import VisitorCounter from "../../components/VisitorCounter";
import React from "react";

const Home: React.FC = () => {
    return (<>
        <div>
            <h1>Welcome to the official</h1>
            <NewRetroImageLoader
                alt="EVBP"
                height={150}
                src="/images/evbp_stereogram_logo_transparent_lo_rez.png"
                width={600}
            />
            <h1>Home Page</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%", textAlign: "center" }}>
            <MenuButton text={"Home"} onClick={() => console.log("Hello World!")} />
            <MenuButton text={"Bio"} onClick={() => console.log("Hello World!")} />
            <MenuButton text={"music"} onClick={() => console.log("Hello World!")} />
            <MenuButton text={"Pics"} onClick={() => console.log("Hello World!")} />
            <MenuButton text={"Blog"} onClick={() => console.log("Hello World!")} />
            <MenuButton text={"Links"} onClick={() => console.log("Hello World!")} />
        </div>
        <div className="card">
            <ImageUnavailable width={100} />
        </div>
        <div data-testid="visit-counter-container">
            <VisitorCounter />
        </div>
    </>);
}

export default Home;