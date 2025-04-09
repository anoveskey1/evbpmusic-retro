import { FC, ReactNode } from "react";
import "./style.less";

export interface IButtonWrapperProps {
  icon?: ReactNode;
  onClick?: () => void;
  testId?: string;
  text: string;
}

const ButtonWrapper: FC<IButtonWrapperProps> = ({
  icon,
  onClick,
  testId = "button-wrapper",
  text,
}) => {
  const componentPrefix = "button-wrapper";

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <div className={componentPrefix} data-testid={testId} onClick={handleClick}>
      {icon && <span className={`${componentPrefix}-icon`}>{icon}</span>}
      {text}
    </div>
  );
};

export default ButtonWrapper;
