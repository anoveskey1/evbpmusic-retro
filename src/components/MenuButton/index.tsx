import React from 'react';
import './style.less';
import {useNavigate} from "react-router-dom";

export interface MenuButtonProps {
    ariaLabel?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    testId?: string;
    text: string;
    to?: string;
}

const MenuButton: React.FC<MenuButtonProps> = (
    {
        ariaLabel = "menu ",
        icon,
        onClick,
        testId = "menu-button",
        text,
        to
    }) => {
    const componentPrefix = "menu-button";
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else if (onClick) {
            onClick();
        }
    }

    return (
        <button
            aria-label={`${text || ariaLabel} ${to ? 'link' : 'button'}`}
            className={componentPrefix}
            data-testid={testId}
            onClick={handleClick}
            role={to ? "link" : "button"}
        >
            {icon && <span className={`${componentPrefix}-icon`}>{icon}</span>}
            {text}
        </button>
    );
}

export default MenuButton