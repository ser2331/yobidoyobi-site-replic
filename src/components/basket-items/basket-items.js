import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { basket as basketActions } from '../../store/actions';
import BasketItem from '../basket-widget/components/basket-item';
import RowButton from '../row-button';
import Types from '../../classes/types';

import './basket-items.scss';

const { routingMap } = Types;

const BasketItems = () => {
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const city = useSelector((state) => _.get(state, 'app.city'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartProduct } = currentBasket;

    const onDelete = (id, productId) => dispatch(basketActions.deleteBasketProduct(id, productId));

    const onChangeCount = (id, count) => dispatch(basketActions.editBasketProduct(id, count));

    const mapLink = (path = routingMap.get('location').path) => {
        const { slug } = city;
        return slug ? `/${slug}${path}` : routingMap.get('location').path;
    };

    const renderEmptyItems = () => (
        <div className="BasketItems__empty">
            <div className="title">
                Корзина пуста
            </div>

            <RowButton
                onClick={() => navigate(mapLink(routingMap.get('home').path))}
                className="go-home-button"
            >
                Вернуться на главную
            </RowButton>
        </div>
    );

    return (
        <div className="BasketItems basket-container">
            <div className="BasketItems__title">
                <span className="BasketItems__title-main">Корзина</span>
                <RowButton onClick={() => dispatch(basketActions.deleteBasketProduct(''))} className="BasketItems__title-clear">
                    Очистить корзину
                </RowButton>
            </div>

            <div className="basket-divider" />

            <div className="BasketItems__items">
                {cartProduct.length
                    ? cartProduct.map((item) => (
                        <BasketItem
                            key={item.id}
                            item={item}
                            onDelete={onDelete}
                            onChangeCount={(quantity) => onChangeCount(item.id, quantity)}
                            useFor="basket"
                        />
                    ))
                    : renderEmptyItems()}
            </div>
        </div>
    );
};

export default BasketItems;
