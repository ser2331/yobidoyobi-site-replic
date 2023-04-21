import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import Types from '../../classes/types';
import { basket as basketActions } from '../../store/actions';
import CustomButton from '../custom-button';
import defaultProductImg from '../../assets/images/default-product.svg';

import './basket-other-item.scss';

const { weightUnitsMap } = Types;

const BasketOtherItem = ({ itemData }) => {
    const dispatch = useDispatch();
    const { name, price, images, id, weight, weight_unit: weightUnit } = itemData;
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const { cartProduct } = currentBasket;

    const itemIdInBasket = cartProduct.find((i) => i.product.id === id);

    const currentWeightType = weightUnitsMap.get(weightUnit) || weightUnitsMap.get('gr');

    return (
        <div className="BasketOtherItem">
            <div className="BasketOtherItem__img-wrapper">
                <img
                    className="BasketOtherItem__img"
                    src={images.length ? images[0].original : defaultProductImg}
                    alt="product_img"
                />
            </div>

            <div className="BasketOtherItem__title-wrapper">
                <div className="title">
                    {name}
                </div>
            </div>

            <div className="BasketOtherItem__row">
                <div className="BasketOtherItem__volume">{weight ? `${weight} ${currentWeightType.label}` : ''}</div>

                <CustomButton
                    onClick={() => dispatch(basketActions.addBasketProduct(id, 1))}
                    type="red-outline"
                    className="BasketOtherItem__button"
                >
                    {itemIdInBasket ? 'Ещё' : ''}
                    {price && !itemIdInBasket ? `${Math.ceil(price).toLocaleString()} ₽` : ''}
                </CustomButton>

            </div>
        </div>
    );
};

BasketOtherItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    itemData: PropTypes.object.isRequired,
};

export default BasketOtherItem;
