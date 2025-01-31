import React from 'react';
import './style.less';

interface MenuButtonProps {
    ariaLabel?: string;
    onClick: () => void;
    testId?: string;
    text: string;
}

const MenuButton: React.FC<MenuButtonProps> = (
    {
        ariaLabel = "menu button",
        onClick,
        testId = "menu-button",
        text
    }) => (
    <button
        aria-label={ariaLabel || text}
        className="menu-button"
        data-testid={testId}
        onClick={onClick}
        role="button"
    >
        {text}
    </button>
);

export default MenuButton