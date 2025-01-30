/* Generate unit tests for ImageUnavailable component */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageUnavailable from './index';

describe('ImageUnavailable', () => {
  test('renders ImageUnavailable component', () => {
    render(<ImageUnavailable />);
    const imageUnavailableElement = screen.getByTestId('image-unavailable');
    expect(imageUnavailableElement).toBeInTheDocument();
  });
});