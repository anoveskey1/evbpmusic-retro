import React from "react";
import AlbumContainer, {
  IAlbumContainerProps,
} from "../../components/AlbumContainer";
import albums from "../../../public/albums.json";

const Music: React.FC = () => {
  const reverseAlbums = albums.slice(0).reverse();

  return (
    <div className="page-container">
      <h1>Music</h1>
      {reverseAlbums.map((album: IAlbumContainerProps, index: number) => (
        <div style={{ paddingBottom: "8px" }} key={index}>
          <AlbumContainer
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
};

export default Music;
