import React from 'react';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import AboutCompanyContent from '../../components/about-company';
import Header from '../header';
import ProductGroupSelector from '../../components/product-group-selector';
import Footer from '../footer';
import AuthModal from '../../components/auth-modal';
import CallMeModal from '../../components/call-me-modal';
import DirectorsFeedbackModal from '../../components/directors-feedback-modal';

const AboutCompany = () => {
    const showAuth = useSelector((state) => _.get(state, 'app.showAuth', false));
    const showCallMe = useSelector((state) => _.get(state, 'app.showCallMe', false));
    const showDirectorsFeedback = useSelector((state) => _.get(state, 'app.showDirectorsFeedback', false));

    return (
        <div className="AboutCompany">
            <Header />
            <ProductGroupSelector />
            <AboutCompanyContent />
            <Footer />

            {showAuth && <AuthModal />}
            {showCallMe && <CallMeModal />}
            {showDirectorsFeedback && <DirectorsFeedbackModal />}
        </div>
    );
};

export default AboutCompany;
