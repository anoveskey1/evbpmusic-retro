import { FC } from "react";
import { Helmet } from "react-helmet-async";
import PageContainer from "@components/PageContainer";
import PageIntro from "@components/PageIntro";
import GalleryContainer from "@components/GalleryContainer";

const Gallery: FC = () => {
  return (
    <PageContainer>
      <Helmet>
        <meta
          name="description"
          content="Live pictures, promo shots, and concert flyers."
        />
        <title>EVBPMusic.com | Gallery</title>
      </Helmet>
      <PageIntro
        description="A collection of photos of EVBP past, present, and future."
        header="Gallery"
      />
      <GalleryContainer />
    </PageContainer>
  );
};

export default Gallery;
