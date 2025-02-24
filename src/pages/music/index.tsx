import React from "react";
import AlbumContainer, {IAlbumContainerProps} from "../../components/AlbumContainer";
import albums from "../../../public/albums.json";
import albumContainer from "../../components/AlbumContainer";

const Music: React.FC = () => {
    const reverseAlbums = albums.slice(0).reverse();

    return (
        <div className="page-container">
            <h1>Music</h1>
            {reverseAlbums.map((album: IAlbumContainerProps,  index: number) => (
                <div style={{ paddingBottom: '8px' }} key={index}>
                    <AlbumContainer
                        availableFormats={album.availableFormats}
                        coverUrl={album.coverUrl}
                        credits={album.credits}
                        links={album.links}
                        releaseDate={album.releaseDate}
                        title={album.title}
                        type={album.type}
                        trackList={album.trackList}
                    />
                </div>
            ))}
        </div>
    );
}

export default Music;