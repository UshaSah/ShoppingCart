import React from 'react';
import Navigation from '../components/Navigation';

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

export default HomePage; 