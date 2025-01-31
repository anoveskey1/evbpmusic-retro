import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuButton from './index';

const mockOnClick = jest.fn();

describe('MenuButton', () => {
    it('should render the button with the correct text', () => {
        render(<MenuButton onClick={mockOnClick} text="Click me!" />);
        expect(screen.getByText('Click me!')).toBeInTheDocument();
    });

    it('should call the onClick function when clicked', () => {
        render(<MenuButton onClick={mockOnClick} text="Click me!" />);
        screen.getByText('Click me!').click();
        expect(mockOnClick).toHaveBeenCalled();
    });
});