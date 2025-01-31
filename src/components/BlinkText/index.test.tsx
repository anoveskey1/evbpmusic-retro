/* Generate unit tests for ImageUnavailable component */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlinkText from './index';

describe('BlinkText', () => {
    test('renders ImageUnavailable component', () => {
        render(<BlinkText text="mock text" />);
        const blinkTextElement = screen.getByTestId('blink-text');
        expect(blinkTextElement).toBeInTheDocument();
        expect(blinkTextElement).toHaveTextContent('mock text');
    });
});