/* generate unit tests that cover the RetroImageLoader component */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RetroImageLoader from './index';

describe('RetroImageLoader', () => {
  test('renders RetroImageLoader component', () => {
    render(<RetroImageLoader />);
    const retroImageLoaderElement = screen.getByTestId('retro-image-loader');
    expect(retroImageLoaderElement).toBeInTheDocument();
  });
});