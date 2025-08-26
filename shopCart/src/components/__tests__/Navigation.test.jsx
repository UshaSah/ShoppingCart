import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

// Wrapper component to provide router context
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('Navigation Component', () => {
    test('renders navigation bar with logo', () => {
        renderWithRouter(<Navigation cartCount={5} />);

        const logoLink = screen.getByText('🛍️ ShopCart');
        expect(logoLink).toBeInTheDocument();
        expect(logoLink).toHaveAttribute('href', '/');
    });

    test('renders navigation links', () => {
        renderWithRouter(<Navigation cartCount={5} />);

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
        expect(screen.getByText('Home')).toHaveAttribute('href', '/');
        expect(screen.getByText('Shop')).toHaveAttribute('href', '/shop');
    });

    test('displays cart count correctly', () => {
        renderWithRouter(<Navigation cartCount={10} />);

        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('items')).toBeInTheDocument();
    });

    test('displays cart count of 0 when no items', () => {
        renderWithRouter(<Navigation cartCount={0} />);

        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('cart icon is clickable', () => {
        renderWithRouter(<Navigation cartCount={5} />);

        const cartIcon = screen.getByText('🛒');
        expect(cartIcon).toBeInTheDocument();
        expect(cartIcon.closest('.nav-cart')).toBeInTheDocument();
    });

    test('renders with default props', () => {
        renderWithRouter(<Navigation />);

        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('has correct CSS classes', () => {
        renderWithRouter(<Navigation cartCount={3} />);

        expect(screen.getByRole('navigation')).toHaveClass('navbar');
        expect(screen.getByText('🛍️ ShopCart')).toHaveClass('nav-logo');
        expect(screen.getByText('Home')).toHaveClass('nav-link');
        expect(screen.getByText('Shop')).toHaveClass('nav-link');
    });
}); 