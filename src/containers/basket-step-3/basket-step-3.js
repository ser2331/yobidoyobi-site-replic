import React from 'react';
import { ReactSVG } from 'react-svg';
import BasketStep3Footer from '../../components/basket-step3-footer';
import LogoBasketSVG from '../../assets/images/logo-basket-step3.svg';

import './basket-step-3.scss';

const BasketStep3 = () => (
    <div className="BasketStep3 basket-container">
        <div className="BasketStep3__logo">
            <ReactSVG src={LogoBasketSVG} />
        </div>
        <div className="BasketStep3__title">
            <div>Ваш заказ оформлен!</div>
        </div>
        <BasketStep3Footer />
    </div>
);

export default BasketStep3;
