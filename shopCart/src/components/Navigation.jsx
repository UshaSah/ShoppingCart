import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ cartCount = 0 }) => {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/shop');
    };

    return (
        <nav className='navbar'>
            <div className='nav-container'>
                <div className='nav-brand'>
                    <span className='nav-logo'>🛍️ ShopCart</span>
                </div>

                <div className='nav-links'>
                    <a href="/" className='nav-link active'>Home</a>
                    <a href="/shop" className='nav-link'>Shop</a>
                </div>

                <div className="nav-cart" onClick={handleCartClick}>
                    <div className="cart-info">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-count">{cartCount}</span>
                        <span className="cart-label">items</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation; 