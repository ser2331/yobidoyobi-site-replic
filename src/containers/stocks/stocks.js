import React from 'react';
import Header from '../header';
import Footer from '../footer';
import ProductGroupSelector from '../../components/product-group-selector';
import StocksContent from '../../components/stocks-content';

import './stocks.scss';

const Stocks = () => (
    <div className="Stocks">
        <Header />
        <ProductGroupSelector />
        <StocksContent />
        <Footer />
    </div>
);

export default Stocks;
