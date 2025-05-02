import ContactForm from "../../components/ContactForm";
import PageContainer from "../../components/PageContainer";

const ContactPage: React.FC = () => {
  return (
    <PageContainer>
      <h1>Contact</h1>
      <h3>Have a question for EVBP? You know what to do!</h3>
      <ContactForm />
    </PageContainer>
  );
};

export default ContactPage;
