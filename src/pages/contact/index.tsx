import React from "react";
import { Helmet } from "react-helmet-async";
import ContactForm from "@components/ContactForm";
import PageContainer from "@components/PageContainer";
import PageIntro from "@components/PageIntro";

const ContactPage: React.FC = () => {
  return (
    <PageContainer>
      <Helmet>
        <meta name="description" content="Get in touch with EVBP!" />
        <title>EVBPMusic.com | Contact</title>
      </Helmet>
      <PageIntro
        description="Have a question for EVBP? You know what to do!"
        header="Contact"
      />
      <ContactForm
        turnstileSiteKey={
          process.env.VITE_EVBP_MUSIC_CLOUDFLARE_TURNSTILE_SITE_KEY
        }
      />
    </PageContainer>
  );
};

export default ContactPage;
