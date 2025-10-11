import React from "react";
import { AlertType } from "@/types";
import getAlertType from "./getAlertType";
import "./style.less";

interface IAlertProps {
  alertType: AlertType;
  children: React.ReactNode;
  onClose: () => void;
}

const Alert: React.FC<IAlertProps> = (props: IAlertProps) => {
  const { alertType, children, onClose } = props;
  const { alt, src } = getAlertType(alertType);

  return (
    <div className="alert-container" data-testid="alert-container">
      <div className="alert-blue-strip">
        <button id="x-close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="alert-content">
        <div className="alert-image-container">
          <img src={src} alt={alt} />
        </div>
        <div className="alert-text-and-button">
          {children}
          <button id="ok-close-button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
