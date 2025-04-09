import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageContainer from './index';

describe('PageContainer', () => {
    test('renders PageContainer component with children', () => {
        render(
            <PageContainer>
                <div data-testid="child-element">Child Element</div>
            </PageContainer>
        );
        const pageContainerElement = screen.getByTestId('child-element');
        expect(pageContainerElement).toBeInTheDocument();
        expect(pageContainerElement).toHaveTextContent('Child Element');
    });
});