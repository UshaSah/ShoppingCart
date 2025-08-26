import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ShopPage from '../ShopPage';

// Mock cart data
const mockCartData = {
    id: 1,
    userId: 1,
    date: "2020-03-02T00:00:00.000Z",
    products: [
        { productId: 1, quantity: 4 },
        { productId: 2, quantity: 1 }
    ]
};

// Mock product data for CartItem components
const mockProduct1 = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    category: "men's clothing"
};

const mockProduct2 = {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.30,
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    category: "men's clothing"
};

// Wrapper component to provide router context
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('ShopPage Component', () => {
    beforeEach(() => {
        // Reset fetch mock before each test
        fetch.mockClear();
    });

    test('renders empty cart when cartData is null', () => {
        renderWithRouter(<ShopPage cartCount={5} cartData={null} />);

        expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();
        expect(screen.getByText('Start shopping to add items to your cart!')).toBeInTheDocument();
    });

    test('renders Navigation component', () => {
        renderWithRouter(<ShopPage cartCount={5} cartData={mockCartData} />);

        expect(screen.getByText('🛍️ ShopCart')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
    });

    test('displays cart header and back button', () => {
        renderWithRouter(<ShopPage cartCount={5} cartData={mockCartData} />);

        expect(screen.getByText('🛒 Your Cart')).toBeInTheDocument();
        expect(screen.getByText('← Back to Shopping')).toBeInTheDocument();
    });

    test('displays cart summary information', () => {
        renderWithRouter(<ShopPage cartCount={5} cartData={mockCartData} />);

        expect(screen.getByText('Cart Summary')).toBeInTheDocument();
        expect(screen.getByText(/Total Items:/)).toBeInTheDocument();
        // Check for the specific cart summary "5" (not navigation)
        const cartSummary = screen.getByText('Cart Summary').closest('.cart-summary');
        expect(cartSummary).toHaveTextContent('5');
        expect(screen.getByText(/Different Products:/)).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText(/Cart ID:/)).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('displays cart items section', () => {
        renderWithRouter(<ShopPage cartCount={5} cartData={mockCartData} />);

        expect(screen.getByText('Cart Items:')).toBeInTheDocument();
    });

    test('renders CartItem components for each product', async () => {
        // Mock the product fetches for CartItem components
        fetch
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockProduct1
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockProduct2
            });

        renderWithRouter(<ShopPage cartCount={5} cartData={mockCartData} />);

        // Wait for CartItem components to load
        await waitFor(() => {
            expect(screen.getByText(mockProduct1.title)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(mockProduct2.title)).toBeInTheDocument();
        });
    });

    test('displays checkout button', () => {
        renderWithRouter(<ShopPage cartCount={5} cartData={mockCartData} />);

        expect(screen.getByText('Proceed to Checkout')).toBeInTheDocument();
    });

    test('shows empty cart message when no products', () => {
        const emptyCartData = {
            ...mockCartData,
            products: []
        };

        renderWithRouter(<ShopPage cartCount={0} cartData={emptyCartData} />);

        expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();
        expect(screen.getByText('Start shopping to add items to your cart!')).toBeInTheDocument();
    });

    test('handles back to shopping button click', () => {
        renderWithRouter(<ShopPage cartCount={5} cartData={mockCartData} />);

        const backButton = screen.getByText('← Back to Shopping');
        fireEvent.click(backButton);

        // The button should still be there after clicking
        expect(backButton).toBeInTheDocument();
        // Cart summary should still be visible
        expect(screen.getByText('Cart Summary')).toBeInTheDocument();
    });

    test('handles checkout button click', () => {
        // Mock window.alert
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => { });

        renderWithRouter(<ShopPage cartCount={5} cartData={mockCartData} />);

        const checkoutButton = screen.getByText('Proceed to Checkout');
        fireEvent.click(checkoutButton);

        expect(alertMock).toHaveBeenCalledWith('Thank you for your order! (This is a demo)');

        alertMock.mockRestore();
    });

    test('displays correct date format', () => {
        renderWithRouter(<ShopPage cartCount={5} cartData={mockCartData} />);

        // The date should be formatted as a readable date
        expect(screen.getByText(/Date:/)).toBeInTheDocument();
    });

    test('has correct CSS classes', () => {
        renderWithRouter(<ShopPage cartCount={5} cartData={mockCartData} />);

        expect(screen.getByText('🛒 Your Cart').closest('.shop-page')).toBeInTheDocument();
        expect(screen.getByText('🛒 Your Cart').closest('.shop-content')).toBeInTheDocument();
    });

    test('renders with default props', () => {
        renderWithRouter(<ShopPage />);

        expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();
    });
}); 