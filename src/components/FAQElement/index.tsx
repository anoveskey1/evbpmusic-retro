import IFAQElement from "@typeDefs/IFAQElement";
import "./style.less";

const FAQElement: React.FC<IFAQElement> = (props: IFAQElement) => {
  const { answer, index, question } = props;

  return (
    <div className="faq-element">
      <div className="faq-index">{index + 1}</div>
      <h3 className="faq-question">{question}</h3>
      <p className="faq-answer">{answer}</p>
    </div>
  );
};

export default FAQElement;
