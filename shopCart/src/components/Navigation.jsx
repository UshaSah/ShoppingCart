import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ cartCount = 0 }) => {
    const navigate = useNavigate();

    const handleCartClick = () => {
        navigate('/shop');
    };

    // Debug: Log the cart count received
    console.log('Navigation received cartCount:', cartCount);

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

Navigation.propTypes = {
    cartCount: PropTypes.number
};

Navigation.defaultProps = {
    cartCount: 0
}

export default Navigation; 