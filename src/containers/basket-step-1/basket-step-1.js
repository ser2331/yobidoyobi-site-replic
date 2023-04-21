import React from 'react';
import BasketGift from '../../components/basket-gift';
import BasketItems from '../../components/basket-items';
import BasketMailing from '../../components/basket-mailing';
import BasketOther from '../../components/basket-other';
import BasketSauces from '../../components/basket-sauces';

import './basket-step-1.scss';

const BasketStep1 = () => (
    <div className="BasketStep1">
        <BasketItems />
        <BasketGift />
        <BasketSauces />
        <BasketOther />
        <BasketMailing />
    </div>
);

export default BasketStep1;
