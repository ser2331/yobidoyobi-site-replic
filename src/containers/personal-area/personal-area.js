import React from 'react';
import PersonalAreaContent from '../../components/personal-area-content';
import Header from '../header';
import ProductGroupSelector from '../../components/product-group-selector';
import Footer from '../footer';

import './personal-area.scss';

const PersonalArea = () => (
    <div className="PersonalArea">
        <Header />
        <ProductGroupSelector />
        <PersonalAreaContent />
        <Footer />
    </div>
);

export default PersonalArea;
