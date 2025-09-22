import { useNavigate } from "react-router-dom";
import { useNavigation } from "@hooks";
import "./style.less";
import useAuth from "@/stores/useAuth";

const NavigationButtons = () => {
  const { goBack, goForward, history, updateHistory } = useNavigation();
  const navigate = useNavigate();

  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const logout = useAuth((state) => state.logout);

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navigation-buttons" role="navigation">
      <button
        className="nav-button-back"
        disabled={history.length <= 1}
        onClick={handleBack}
      >
        Back
      </button>
      <button className="nav-button-home" onClick={() => navigate("/")}>
        Home
      </button>

      <button className="nav-button-forward" onClick={handleNext}>
        Next
      </button>
      {isAuthenticated && (
        <button className="nav-button-home" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
