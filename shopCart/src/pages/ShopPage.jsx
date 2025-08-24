import React from 'react';
import Navigation from '../components/Navigation';

const ShopPage = ({ cartCount = 0 }) => {
    return (
        <div className="shop-page">
            <Navigation cartCount={cartCount} />
            <div className="shop-content">
                {/* This is your blank div for shop content */}
            </div>
        </div>
    );
};

export default ShopPage;
