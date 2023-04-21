import React from 'react';
import Header from '../header';
import Footer from '../footer';
import ProductGroupSelector from '../../components/product-group-selector';
import LegalDocumentsContent from '../../components/legal-documents-content';

import './legal-documents.scss';

const LegalDocuments = () => (
    <div className="LegalDocuments">
        <Header />
        <ProductGroupSelector />
        <LegalDocumentsContent />
        <Footer />
    </div>
);

export default LegalDocuments;
