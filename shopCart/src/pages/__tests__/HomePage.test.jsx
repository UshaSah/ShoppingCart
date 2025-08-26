import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// Wrapper component to provide router context
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('HomePage Component', () => {
    test('renders welcome message', () => {
        renderWithRouter(<HomePage cartCount={5} />);

        expect(screen.getByText('Welcome to ShopCart')).toBeInTheDocument();
    });

    test('renders hero subtitle', () => {
        renderWithRouter(<HomePage cartCount={5} />);

        expect(screen.getByText(/Your one-stop destination for amazing products/)).toBeInTheDocument();
    });

    test('renders Navigation component', () => {
        renderWithRouter(<HomePage cartCount={5} />);

        // Check for Navigation elements
        expect(screen.getByText('🛍️ ShopCart')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
    });

    test('passes cartCount to Navigation component', () => {
        renderWithRouter(<HomePage cartCount={10} />);

        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('items')).toBeInTheDocument();
    });

    test('renders with default cartCount', () => {
        renderWithRouter(<HomePage />);

        expect(screen.getByText('0')).toBeInTheDocument();
    });

    test('has correct CSS classes', () => {
        renderWithRouter(<HomePage cartCount={3} />);

        expect(screen.getByText('Welcome to ShopCart').closest('.home-page')).toBeInTheDocument();
        expect(screen.getByText('Welcome to ShopCart').closest('.hero-section')).toBeInTheDocument();
    });

    test('renders complete page structure', () => {
        renderWithRouter(<HomePage cartCount={5} />);

        // Check main page structure
        expect(screen.getByText('Welcome to ShopCart')).toBeInTheDocument();
        expect(screen.getByText(/Your one-stop destination/)).toBeInTheDocument();

        // Check navigation structure
        expect(screen.getByText('🛍️ ShopCart')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
        expect(screen.getByText('🛒')).toBeInTheDocument();
    });
}); 