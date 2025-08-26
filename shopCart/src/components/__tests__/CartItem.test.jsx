import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItem from '../CartItem';

// Mock product data
const mockProduct = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    category: "men's clothing",
    rating: { rate: 3.9, count: 120 }
};

describe('CartItem Component', () => {
    beforeEach(() => {
        // Reset fetch mock before each test
        fetch.mockClear();
    });

    test('renders loading state initially', () => {
        fetch.mockImplementationOnce(() =>
            new Promise(() => { }) // Never resolves to keep loading
        );

        render(<CartItem productId={1} quantity={2} />);

        expect(screen.getByTestId('cart-item-skeleton')).toBeInTheDocument();
    });

    test('renders product details after successful fetch', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct
        });

        render(<CartItem productId={1} quantity={3} />);

        await waitFor(() => {
            expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
        });

        expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
        expect(screen.getByText('$109.95')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByText('$329.85')).toBeInTheDocument(); // 109.95 * 3
    });

    test('renders error state when fetch fails', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<CartItem productId={1} quantity={2} />);

        await waitFor(() => {
            expect(screen.getByText(/error loading product 1/i)).toBeInTheDocument();
        });
    });

    test('renders error state when API returns error status', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        render(<CartItem productId={1} quantity={2} />);

        await waitFor(() => {
            expect(screen.getByText(/error loading product 1/i)).toBeInTheDocument();
        });
    });

    test('displays product image with correct alt text', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct
        });

        render(<CartItem productId={1} quantity={1} />);

        await waitFor(() => {
            const image = screen.getByAltText(mockProduct.title);
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', mockProduct.image);
        });
    });

    test('quantity input updates correctly', async () => {
        const user = userEvent.setup();

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct
        });

        render(<CartItem productId={1} quantity={2} />);

        await waitFor(() => {
            expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
        });

        const quantityInput = screen.getByRole('spinbutton');
        expect(quantityInput).toHaveValue(2);

        await user.clear(quantityInput);
        await user.type(quantityInput, '5');

        expect(quantityInput).toHaveValue(5);
        expect(screen.getByText('$549.75')).toBeInTheDocument(); // 109.95 * 5
    });

    test('quantity input has correct min and max attributes', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct
        });

        render(<CartItem productId={1} quantity={1} />);

        await waitFor(() => {
            expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
        });

        const quantityInput = screen.getByRole('spinbutton');
        expect(quantityInput).toHaveAttribute('min', '0');
        expect(quantityInput).toHaveAttribute('max', '99');
    });

    test('handles invalid quantity input gracefully', async () => {
        const user = userEvent.setup();

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct
        });

        render(<CartItem productId={1} quantity={1} />);

        await waitFor(() => {
            expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
        });

        const quantityInput = screen.getByRole('spinbutton');

        await user.clear(quantityInput);
        await user.type(quantityInput, 'abc');

        expect(quantityInput).toHaveValue(0);
        expect(screen.getByText('$0.00')).toBeInTheDocument();
    });

    test('fetches correct product based on productId prop', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct
        });

        render(<CartItem productId={5} quantity={1} />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/5');
        });
    });

    test('has correct CSS classes', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProduct
        });

        render(<CartItem productId={1} quantity={2} />);

        await waitFor(() => {
            expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
        });

        expect(screen.getByText(mockProduct.title).closest('.cart-item')).toBeInTheDocument();
        expect(screen.getByText(mockProduct.title)).toHaveClass('cart-item-title');
    });
}); 