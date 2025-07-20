import React from "react";
import AlbumContainer from "../../components/AlbumContainer";
import IAlbumContainer from "../../types/IAlbumContainer";
import albums from "../../../public/albums.json";
import PageContainer from "../../components/PageContainer";
import PageIntro from "../../components/PageIntro";

const Music: React.FC = () => {
  const reverseAlbums = albums.slice(0).reverse();

  return (
    <PageContainer>
      <PageIntro
        description="Here, you will find information about EVBP's entire discography, including summaries behind each release, interesting tidbits, and possibly clues about other things..."
        header="Music"
      />
      {reverseAlbums.map((album: IAlbumContainer, index: number) => (
        <AlbumContainer
          coverUrl={album.coverUrl}
          credits={album.credits}
          key={index}
          links={album.links}
          releaseDate={album.releaseDate}
          summary={album.summary}
          title={album.title}
          type={album.type}
          trackList={album.trackList}
        />
      ))}
    </PageContainer>
  );
};

export default Music;
