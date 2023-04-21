import React from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import Types from '../../classes/types';
import { basket as basketActions } from '../../store/actions';
import BasketCounter from '../basket-widget/components/basket-counter';
import defaultProductImg from '../../assets/images/default-product.svg';

import './sauce-item.scss';

const { weightUnitsMap } = Types;

const SauceItem = ({ itemData }) => {
    const dispatch = useDispatch();

    const {
        name, price, images, id, weight, weight_unit: weightUnit,
    } = itemData;

    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const { cartProduct } = currentBasket;

    const itemIdInBasket = cartProduct.find((i) => i.product.id === id);

    const currentWeightType = weightUnitsMap.get(weightUnit) || weightUnitsMap.get('gr');

    const onChangeCount = (quantity) => {
        if (itemIdInBasket) {
            dispatch(basketActions.editBasketProduct(itemIdInBasket.id, quantity));
        } else {
            dispatch(basketActions.addBasketProduct(id, 1));
        }
    };

    return (
        <div className="SauceItem">
            <div className="SauceItem__img-wrapper">
                <img
                    className="SauceItem__img"
                    src={images.length ? images[0].original : defaultProductImg}
                    alt="product_img"
                />
            </div>

            <div className="SauceItem__title-wrapper">
                <div className="title">
                    {name}
                </div>
            </div>

            <div className="SauceItem__weight">{weight ? `${weight} ${currentWeightType.label}` : ''}</div>

            <BasketCounter count={itemIdInBasket?.quantity || 0} onChange={onChangeCount} />

            <div className="SauceItem__price">
                {`${Math.ceil(price).toLocaleString()} ₽`}
            </div>
        </div>
    );
};

SauceItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    itemData: PropTypes.object.isRequired,
};

export default SauceItem;
