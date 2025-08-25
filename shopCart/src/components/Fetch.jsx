import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const FetchGetRequest = ({ onCartCountUpdate }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                console.log('Fetch component: Fetching cart data...'); // Test log
                const response = await fetch('https://fakestoreapi.com/carts/1');

                console.log('Fetch component: Response status:', response.status); // Test response status

                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }

                const cartData = await response.json();
                console.log('Fetch component: Cart data received:', cartData); // Test the data

                // calculate total number of products
                const countProduct = cartData.products.reduce((sum, product) => {
                    return sum + product.quantity;
                }, 0);
                console.log('Fetch component: Total number of products in the cart (countProduct):', countProduct);

                setData(cartData);
                setError(null);

                // Pass the cart count back to parent component
                if (onCartCountUpdate) {
                    console.log('Fetch component: Calling onCartCountUpdate with:', countProduct);
                    onCartCountUpdate(countProduct);
                } else {
                    console.log('Fetch component: onCartCountUpdate function not provided');
                }
            } catch (err) {
                console.error('Fetch component: Fetch error:', err); // Test error handling
                setError(err.message);
                setData(null);

                // Pass 0 if there's an error
                if (onCartCountUpdate) {
                    console.log('Fetch component: Calling onCartCountUpdate with 0 due to error');
                    onCartCountUpdate(0);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [onCartCountUpdate]);

    // Test the component state
    console.log('Fetch component state:', { data, loading, error });

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