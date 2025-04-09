import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ButtonWrapper from './index';

const mockOnClick = jest.fn();

describe('ButtonWrapper', () => {
    it('should render with the correct text', () => {
        render(<ButtonWrapper onClick={mockOnClick} text="Click me!" />);
        expect(screen.getByText('Click me!')).toBeInTheDocument();
    });

    it('should call the onClick function when clicked', () => {
        render(<ButtonWrapper onClick={mockOnClick} text="Click me!" />);
        screen.getByText('Click me!').click();
        expect(mockOnClick).toHaveBeenCalled();
    });
});