import React from "react";
import ContactForm from "../../components/ContactForm";
import PageContainer from "../../components/PageContainer";
import PageIntro from "../../components/PageIntro";

const ContactPage: React.FC = () => {
  return (
    <PageContainer>
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
