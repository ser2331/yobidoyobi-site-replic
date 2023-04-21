import React from 'react';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import Mailing from '../../containers/footer/components';

import './basket-mailing.scss';

const BasketMailing = () => {
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));

    const mobile = appSize === 'mobile';

    return (
        <div className="BasketMailing basket-container">
            <div className="BasketMailing__title">
                Рассылка
            </div>

            <div className="basket-divider" />

            <div className="BasketMailing__content">
                <div className="BasketMailing__description">
                    Подпишись на рассылку
                    {!mobile && <br />}
                    и будь в курсе всех акций!
                </div>

                <Mailing />
            </div>
        </div>
    );
};

export default BasketMailing;
