import { FC } from "react";
import PageContainer from "../../components/PageContainer";
import { Helmet } from "react-helmet-async";

const Bio: FC = () => {
  return (
    <PageContainer>
      <Helmet>
        <meta
          name="description"
          content="Discover the origin story of EVBP, the artist behind the music. From his humble beginnings as a [REDACTED] to his meteoric rise to [CITATION NEEDED]"
        />
        <title>EVBPMusic.com | Bio</title>
      </Helmet>
    </PageContainer>
  );
};

export default Bio;
