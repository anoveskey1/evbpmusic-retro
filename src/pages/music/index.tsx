import React from "react";
import AlbumContainer, {
  IAlbumContainerProps,
} from "../../components/AlbumContainer";
import albums from "../../../public/albums.json";
import PageContainer from "../../components/PageContainer";

const Music: React.FC = () => {
  const reverseAlbums = albums.slice(0).reverse();

  return (
    <PageContainer>
      <h1>Music</h1>
      {reverseAlbums.map((album: IAlbumContainerProps, index: number) => (
        <AlbumContainer
          coverUrl={album.coverUrl}
          credits={album.credits}
          key={index}
          links={album.links}
          releaseDate={album.releaseDate}
          title={album.title}
          type={album.type}
          trackList={album.trackList}
        />
      ))}
    </PageContainer>
  );
};

export default Music;
