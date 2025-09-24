import { FC } from "react";
import FAQElement from "@components/FAQElement";
import PageContainer from "@components/PageContainer";
import PageIntro from "@components/PageIntro";
import faqs from "../../../public/faqs.json";
import "./style.less";

const Faq: FC = () => {
  return (
    <PageContainer>
      <PageIntro
        description="Have questions? We've got answers!"
        header="FAQ"
      />
      <div className="faq-container">
        {faqs.map(
          (faq: { question: string; answer: string }, index: number) => (
            <FAQElement
              answer={faq.answer}
              index={index}
              key={index}
              question={faq.question}
            />
          ),
        )}
      </div>
    </PageContainer>
  );
};

export default Faq;
