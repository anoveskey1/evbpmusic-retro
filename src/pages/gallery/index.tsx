import { FC } from "react";
import PageContainer from "@components/PageContainer";
import PageIntro from "@components/PageIntro";
import GalleryContainer from "@components/GalleryContainer";

const Gallery: FC = () => {
  return (
    <PageContainer>
      <PageIntro
        description="A collection of photos of EVBP past, present, and future."
        header="Gallery"
      />
      <GalleryContainer />
    </PageContainer>
  );
};

export default Gallery;
