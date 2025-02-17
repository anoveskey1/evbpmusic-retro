import React from "react";
import AlbumContainer from "../../components/AlbumContainer";


const Music: React.FC = () => {
    return (
        <div>
            <h1>Music</h1>
            <AlbumContainer
                availableFormats={["digital"]}
                coverUrl="/images/lofimouth-hirez.jpg"
                credits="Produced by EVBP"
                links={[
                    {
                        url: "https://evbp.bandcamp.com/album/lofimouth",
                        title: "bandcamp"
                    }]}
                releaseDate="2004-01-01"
                title="Lofi Mouth"
                type={"LP"}
                trackList={["Lofi Mouth", "Lofi Mouth (Instrumental)"]}
            />
        </div>
    );
}

export default Music;