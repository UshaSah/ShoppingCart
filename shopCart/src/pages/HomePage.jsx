import React from 'react';
import Navigation from '../components/Navigation';
import PropTypes from 'prop-types';

const HomePage = ({ cartCount = 0 }) => {
    return (
        <div className="home-page">
            <Navigation cartCount={cartCount} />
            <div className="hero-section">
                <h1>Welcome to ShopCart</h1>
                <p className="hero-subtitle">
                    Your one-stop destination for amazing products at great prices!
                </p>
            </div>
        </div>
    );
};

HomePage.propTypes = {
    cartCount: PropTypes.number
};

HomePage.defaultProps = {
    cartCount: 0
};

export default HomePage; 