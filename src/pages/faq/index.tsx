import { FC } from "react";
import PageContainer from "../../components/PageContainer";
import FAQElement from "../../components/FAQElement";
import faqs from "../../../public/faqs.json";
import PageIntro from "../../components/PageIntro";

const Faq: FC = () => {
  return (
    <PageContainer>
      <PageIntro
        description="Have questions? We've got answers!"
        header="FAQ"
      />
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
