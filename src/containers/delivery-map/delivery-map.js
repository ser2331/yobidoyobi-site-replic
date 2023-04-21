import React from 'react';
import Header from '../header';
import Footer from '../footer';
import ProductGroupSelector from '../../components/product-group-selector';
import DeliveryMapContent from '../../components/delivery-map-content';

import './delivery-map.scss';

const DeliveryMap = () => (
    <div className="LegalDocuments">
        <Header />
        <ProductGroupSelector />
        <DeliveryMapContent />
        <Footer />
    </div>
);

export default DeliveryMap;
