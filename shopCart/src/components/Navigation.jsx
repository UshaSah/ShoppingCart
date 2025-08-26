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
                    <Link to="/" className='nav-logo'>🛍️ ShopCart</Link>
                </div>

                <div className='nav-links'>
                    <Link to="/" className='nav-link active'>Home</Link>
                    <Link to="/shop" className='nav-link'>Shop</Link>
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