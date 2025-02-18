import React from "react";
import AlbumContainer, {IAlbumContainerProps} from "../../components/AlbumContainer";
import albums from "../../../public/albums.json";
import albumContainer from "../../components/AlbumContainer";

const Music: React.FC = () => {
    return (
        <div>
            <h1>Music</h1>
            {albums.map((album: IAlbumContainerProps,  index: number) => (
                <AlbumContainer
                availableFormats={album.availableFormats}
                coverUrl={album.coverUrl}
                credits={album.credits}
                links={album.links}
                releaseDate={album.releaseDate}
                title={album.title}
                type={album.type}
                trackList={["Lofi Mouth", "Lofi Mouth (Instrumental)"]}
            />))}
        </div>
    );
}

export default Music;