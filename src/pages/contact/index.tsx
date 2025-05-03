import ContactForm from "../../components/ContactForm";
import PageContainer from "../../components/PageContainer";

const ContactPage: React.FC = () => {
  return (
    <PageContainer>
      <h1>Contact</h1>
      <h3>Have a question for EVBP? You know what to do!</h3>
      <ContactForm
        recipientEmail={import.meta.env.VITE_EVBP_MUSIC_EMAILJS_RECIPIENT_EMAIL}
        serviceId={import.meta.env.VITE_EVBP_MUSIC_EMAILJS_SERVICE_ID}
        templateId={import.meta.env.VITE_EVBP_MUSIC_EMAILJS_TEMPLATE_ID}
        publicKey={import.meta.env.VITE_EVBP_MUSIC_EMAILJS_PUBLIC_KEY}
        turnstileSiteKey={
          import.meta.env.VITE_EVBP_MUSIC_CLOUDFLARE_TURNSTILE_SITE_KEY
        }
      />
    </PageContainer>
  );
};

export default ContactPage;
