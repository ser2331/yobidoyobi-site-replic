import React from 'react';
import Header from '../header';
import Footer from '../footer';
import ProductGroupSelector from '../../components/product-group-selector';
import ProductCardContent from '../../components/product-card-content';

import './product-card.scss';

const ProductCard = () => (
    <div className="LegalDocuments">
        <Header />
        <ProductGroupSelector />
        <ProductCardContent />
        <Footer />
    </div>
);

export default ProductCard;
