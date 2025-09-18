import { useNavigate } from "react-router-dom";
import { useNavigation } from "@hooks";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import "./style.less";

const NavigationButtons = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
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
      {user && (
        <button className="logout-button" onClick={() => dispatch(logout())}>
          Logout
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
