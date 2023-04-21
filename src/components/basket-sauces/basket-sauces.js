import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { Col, Row } from 'antd';
import { basket as basketActions } from '../../store/actions';
import SauceItem from '../sauce-item';
import BasketSaucesModal from '../basket-sauces-modal';
import { getSaucesItems } from '../../selectors/selectors';

import './basket-sauces.scss';

const BasketSauces = () => {
    const dispatch = useDispatch();
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const showSaucesModal = useSelector((state) => _.get(state, 'basket.showSaucesModal'));
    const saucesItems = useSelector(getSaucesItems);
    const { cartProduct, cartId: basketId } = currentBasket;

    const mobile = appSize === 'mobile';
    const saucesInBasket = cartProduct?.some((item) => saucesItems.some((i) => i.id === item.product.id));

    useEffect(() => {
        if (basketId && !saucesInBasket) {
            dispatch(basketActions.showSaucesModal(true));
        }
    }, [dispatch, saucesInBasket, basketId]);

    return (
        <div className="BasketSauces basket-container">
            <div className="BasketSauces__title">
                Соусы, васаби, палочки
            </div>

            <div className="basket-divider" />

            <Row className="BasketSauces__items">
                {saucesItems.map((itemData) => (
                    <Col span={mobile ? 12 : 8} key={itemData.id}>
                        <SauceItem itemData={itemData} />
                    </Col>
                ))}
            </Row>

            {showSaucesModal && <BasketSaucesModal />}
        </div>
    );
};

export default BasketSauces;
