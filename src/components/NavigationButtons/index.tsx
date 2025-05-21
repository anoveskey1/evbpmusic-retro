import { useNavigate } from "react-router-dom";
import { useNavigation } from "../../hooks";
import "./style.less";

const NavigationButtons = () => {
  const { goBack, goForward, history, updateHistory } = useNavigation();
  const navigate = useNavigate();

  const handleBack = () => {
    const previousPage = goBack();

    if (previousPage) {
      navigate(previousPage);
    }
  };

  const handleNext = () => {
    const nextPage = goForward();
    if (nextPage) {
      updateHistory(nextPage);
      navigate(nextPage);
    }
  };

  return (
    <div className="navigation-buttons" role="navigation">
      <button disabled={history.length <= 1} onClick={handleBack}>
        Back
      </button>
      <button className="navigation-buttons-home" onClick={() => navigate("/")}>
        Home
      </button>

      <button disabled={!goForward()} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;
