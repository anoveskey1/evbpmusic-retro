import ContactForm from "../../components/ContactForm";
import PageContainer from "../../components/PageContainer";

const ContactPage: React.FC = () => {
  return (
    <PageContainer>
      <h1>Contact</h1>
      <p>Have a question for EVBP? You know what to do!</p>
      <ContactForm
        turnstileSiteKey={
          process.env.VITE_EVBP_MUSIC_CLOUDFLARE_TURNSTILE_SITE_KEY
        }
      />
    </PageContainer>
  );
};

export default ContactPage;
