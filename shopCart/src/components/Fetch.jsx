import { useEffect, useState } from 'react';

const FetchGetRequest = ({ onCartCountUpdate }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                console.log('Fetching cart data...'); // Test log
                const response = await fetch('https://fakestoreapi.com/carts/1');

                console.log('Response status:', response.status); // Test response status
                console.log('Response headers:', response.headers); // Test headers

                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }

                const cartData = await response.json();
                console.log('Cart data received:', cartData); // Test the data

                // calculate total number of products
                const countProduct = cartData.products.reduce((sum, product) => {
                    return sum + product.quantity;
                }, 0);
                console.log('Total number of products in the cart:', countProduct);

                setData(cartData);
                setError(null);

                // Pass the cart count back to parent component
                if (onCartCountUpdate) {
                    onCartCountUpdate(countProduct);
                }
            } catch (err) {
                console.error('Fetch error:', err); // Test error handling
                setError(err.message);
                setData(null);

                // Pass 0 if there's an error
                if (onCartCountUpdate) {
                    onCartCountUpdate(0);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [onCartCountUpdate]);

    // Test the component state
    console.log('Component state:', { data, loading, error });

    if (loading) {
        return <div>Loading cart data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>No data received</div>;
    }

    return (
        <div>
            <h2>Cart Data Test</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default FetchGetRequest;