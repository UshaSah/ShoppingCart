import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://fakestoreapi.com'

const CartItem = ({ productId, quantity: initialQuantity }) => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(initialQuantity);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartItem = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/products/${productId}`);

                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                let productData = await response.json()
                setProduct(productData);
                setError(null);

            } catch (err) {
                setError(err.message);
                setProduct(null);

            } finally {
                setLoading(false)
            }
        };
        fetchCartItem();
    }, [productId])

    if (loading) {
        return (
            <div className="cart-item loading">
                <div className="cart-item-skeleton">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-price"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="cart-item error">
                <p>Error loading product {productId}</p>
            </div>
        );
    }

    return (
        <div className="cart-item">
            <div className='cart-item-image'>
                <img src={product.image} alt={product.title} />
            </div>

            <div className='cart-item-details'>
                <h3 className='cart-item-title'>{product.title}</h3>
                <p className='cart-item-category'>{product.category}</p>
                <div className='cart-item-price'>${product.price.toFixed(2)}</div>
                <div className='cart-item-quantity'>
                    <span className="quantity-label">Quantity:</span>
                    <input
                        type="number"
                        min="0"
                        max="99"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                        className='quantity-input'
                    />
                    <span className="quantity-value">{quantity}</span>
                </div>
                <div className='cart-item-total'>
                    <span className="total-label">Total:</span>
                    <span className="total-value">${(product.price * quantity).toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
};

export default CartItem;