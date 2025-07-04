import { FC } from "react";
import PageContainer from "../../components/PageContainer";
import FAQElement from "../../components/FAQElement";
import faqs from "../../../public/faqs.json";

const Faq: FC = () => {
  return (
    <PageContainer>
      <h1>FAQ</h1>
      <p>Have questions? We&apos;ve got answers!</p>
      {faqs.map((faq: { question: string; answer: string }, index: number) => (
        <FAQElement
          answer={faq.answer}
          index={index}
          key={index}
          question={faq.question}
        />
      ))}
    </PageContainer>
  );
};

export default Faq;
