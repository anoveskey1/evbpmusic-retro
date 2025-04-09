import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileNavigation from './index';

describe('MobileNavigation', () => {
    test('renders MobileNavigation component with all links', () => {
        Object.defineProperty(window, "location", {
            value: {
                pathname: "/some-path"
            },
        });

        render(<MobileNavigation />);

        expect(screen.getByText('home')).toBeInTheDocument();
        expect(screen.getByText('news')).toBeInTheDocument();
        expect(screen.getByText('faq')).toBeInTheDocument();
        expect(screen.getByText('discography')).toBeInTheDocument();
        expect(screen.getByText('links')).toBeInTheDocument();
        expect(screen.getByText('pics')).toBeInTheDocument();
        expect(screen.getByText('guestbook')).toBeInTheDocument();
        expect(screen.getByText('contact')).toBeInTheDocument();
    });

    test('does not render home link when on root path', () => {
        Object.defineProperty(window, "location", {
            value: {
                pathname: "/"
            },
        });

        render(<MobileNavigation />);

        expect(window.location.pathname).toBe('/');
        expect(screen.queryByText('home')).not.toBeInTheDocument();
    });
});