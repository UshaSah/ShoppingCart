import { render, screen, waitFor } from '@testing-library/react';
import FetchGetRequest from '../Fetch';

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

describe('FetchGetRequest Component', () => {
    beforeEach(() => {
        // Reset fetch mock before each test
        fetch.mockClear();
    });

    test('renders loading state initially', () => {
        fetch.mockImplementationOnce(() =>
            new Promise(() => { }) // Never resolves to keep loading
        );

        render(<FetchGetRequest />);

        expect(screen.getByText('Loading cart data...')).toBeInTheDocument();
    });

    test('renders cart data after successful fetch', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        render(<FetchGetRequest />);

        await waitFor(() => {
            expect(screen.getByText('Cart Data Test')).toBeInTheDocument();
        });

        expect(screen.getByText(/"id": 1/)).toBeInTheDocument();
        expect(screen.getByText(/"userId": 1/)).toBeInTheDocument();
    });

    test('renders error state when fetch fails', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<FetchGetRequest />);

        await waitFor(() => {
            expect(screen.getByText(/Error: Network error/)).toBeInTheDocument();
        });
    });

    test('renders error state when API returns error status', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        render(<FetchGetRequest />);

        await waitFor(() => {
            expect(screen.getByText(/Error: HTTP error: Status 404/)).toBeInTheDocument();
        });
    });

    test('calls onCartCountUpdate callback with correct count', async () => {
        const mockCallback = vi.fn();

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        render(<FetchGetRequest onCartCountUpdate={mockCallback} />);

        await waitFor(() => {
            expect(mockCallback).toHaveBeenCalledWith(5); // 4 + 1
        });
    });

    test('calls onCartCountUpdate with 0 when fetch fails', async () => {
        const mockCallback = vi.fn();

        fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<FetchGetRequest onCartCountUpdate={mockCallback} />);

        await waitFor(() => {
            expect(mockCallback).toHaveBeenCalledWith(0);
        });
    });

    test('does not call onCartCountUpdate when prop is not provided', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        render(<FetchGetRequest />);

        await waitFor(() => {
            expect(screen.getByText('Cart Data Test')).toBeInTheDocument();
        });

        // Should not throw any errors about missing callback
    });

    test('fetches from correct API endpoint', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        render(<FetchGetRequest />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/carts/1');
        });
    });

    test('calculates total product count correctly', async () => {
        const cartWithMultipleProducts = {
            ...mockCartData,
            products: [
                { productId: 1, quantity: 3 },
                { productId: 2, quantity: 2 },
                { productId: 3, quantity: 1 }
            ]
        };

        const mockCallback = vi.fn();

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => cartWithMultipleProducts
        });

        render(<FetchGetRequest onCartCountUpdate={mockCallback} />);

        await waitFor(() => {
            expect(mockCallback).toHaveBeenCalledWith(6); // 3 + 2 + 1
        });
    });

    test('handles empty products array', async () => {
        const emptyCart = {
            ...mockCartData,
            products: []
        };

        const mockCallback = vi.fn();

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => emptyCart
        });

        render(<FetchGetRequest onCartCountUpdate={mockCallback} />);

        await waitFor(() => {
            expect(mockCallback).toHaveBeenCalledWith(0);
        });
    });

    test('displays error when fetch returns null', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => null
        });

        render(<FetchGetRequest />);

        await waitFor(() => {
            expect(screen.getByText(/Error: Invalid cart data received/)).toBeInTheDocument();
        });
    });

    test('logs console messages for debugging', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockCartData
        });

        render(<FetchGetRequest />);

        await waitFor(() => {
            expect(console.log).toHaveBeenCalledWith('Fetch component: Fetching cart data...');
        });
    });
}); 