import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import CartItem from '../components/CartItem';

const ShopPage = ({ cartCount = 0, cartData = null }) => {
    const [showCart, setShowCart] = useState(true);

    const handleCartToggle = () => {
        setShowCart(!showCart);
    };

    const handleCheckout = () => {
        alert('Thank you for your order! (This is a demo)');
        setShowCart(false);
    };

    return (
        <div className="shop-page">
            <Navigation cartCount={cartCount} />
            <div className="shop-content">
                <div className="cart-header">
                    <h1>🛒 Your Cart</h1>
                    <button onClick={handleCartToggle} className="back-to-shop-btn">
                        ← Back to Shopping
                    </button>
                </div>

                {cartData && cartData.products.length > 0 ? (
                    <>
                        <div className="cart-summary">
                            <h3>Cart Summary</h3>
                            <p><strong>Total Items:</strong> {cartData.products.reduce((sum, product) => sum + product.quantity, 0)}</p>
                            <p><strong>Different Products:</strong> {cartData.products.length}</p>
                            <p><strong>Cart ID:</strong> {cartData.id}</p>
                            <p><strong>Date:</strong> {new Date(cartData.date).toLocaleDateString()}</p>
                        </div>

                        <div className="cart-items-container">
                            <h3>Cart Items:</h3>
                            {cartData.products.map((item, index) => (
                                <CartItem
                                    key={index}
                                    productId={item.productId}
                                    quantity={item.quantity}
                                />
                            ))}
                        </div>

                        <div className="cart-actions">
                            <button onClick={handleCheckout} className="checkout-btn">
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="empty-cart">
                        <h2>Your Cart is Empty</h2>
                        <p>Start shopping to add items to your cart!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
