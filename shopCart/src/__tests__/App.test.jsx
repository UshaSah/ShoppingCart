import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

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

// App already has BrowserRouter, so we don't need to wrap it
const renderApp = (component) => {
    return render(component);
};

describe('App Component', () => {
    beforeEach(() => {
        // Reset fetch mock before each test
        fetch.mockClear();
    });

    test('renders app with router setup', () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        renderApp(<App />);

        expect(screen.getByText('🛍️ ShopCart')).toBeInTheDocument();
    });

    test('fetches cart data on mount', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        renderApp(<App />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/carts/1');
        });
    });

    test('calculates total product count correctly', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        renderApp(<App />);

        await waitFor(() => {
            expect(screen.getByText('5')).toBeInTheDocument(); // 4 + 1
        });
    });

    test('handles fetch error gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        renderApp(<App />);

        await waitFor(() => {
            expect(screen.getByText('0')).toBeInTheDocument(); // Default count
        });
    });

    test('handles API error status', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        renderApp(<App />);

        await waitFor(() => {
            expect(screen.getByText('0')).toBeInTheDocument(); // Default count
        });
    });

    test('renders navigation links', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        renderApp(<App />);

        await waitFor(() => {
            expect(screen.getByText('Home')).toBeInTheDocument();
            expect(screen.getByText('Shop')).toBeInTheDocument();
        });
    });

    test('renders home page content', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        renderApp(<App />);

        await waitFor(() => {
            expect(screen.getByText('Welcome to ShopCart')).toBeInTheDocument();
        });
    });

    test('renders Fetch component on home page', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        renderApp(<App />);

        await waitFor(() => {
            expect(screen.getByText('Cart Data Test')).toBeInTheDocument();
        });
    });

    test('passes cart data to child components', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        renderApp(<App />);

        await waitFor(() => {
            // Check that cart count is displayed in navigation
            expect(screen.getByText('5')).toBeInTheDocument();
        });
    });

    test('logs console messages for debugging', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        renderApp(<App />);

        await waitFor(() => {
            // Just verify that some console logs were called
            expect(console.log).toHaveBeenCalled();
        });
    });

    test('has correct CSS classes', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        renderApp(<App />);

        await waitFor(() => {
            expect(screen.getByText('🛍️ ShopCart').closest('.App')).toBeInTheDocument();
        });
    });
}); 