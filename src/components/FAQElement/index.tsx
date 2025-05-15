import IFAQElementProps from "./IFAQElementProps";
import "./style.less";

const FAQElement: React.FC<IFAQElementProps> = (props: IFAQElementProps) => {
  const { answer, index, question } = props;

  return (
    <div className="faq-element">
      <div className="faq-index">{index}</div>
      <h3 className="faq-question">{question}</h3>
      <p className="faq-answer">{answer}</p>
    </div>
  );
};

export default FAQElement;
