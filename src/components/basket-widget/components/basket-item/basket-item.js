import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import { ReactSVG } from 'react-svg';
import Types from '../../../../classes/types';
import BasketCounter from '../basket-counter';
import defaultProductImg from '../../../../assets/images/default-product.svg';
import trashIcon from '../../../../assets/images/trash.svg';

import './basket-item.scss';

const { weightUnitsMap, imageSizeMap } = Types;

const BasketItem = ({ item, onDelete, onChangeCount, useFor }) => {
    const { id, product, quantity, is_promo: isPromo } = item;
    const { name, description, price, images, weight_unit: weightUnit, weight } = product;

    const appSize = useSelector((state) => _.get(state, 'app.appSize'));

    const isForWidget = useFor === 'basket-widget';
    const isNoPromoPrice = !price || price === '0.00';
    const formattedDescription = description.split(',').join(', ');

    const currentWeightType = weightUnitsMap.get(weightUnit) || weightUnitsMap.get('gr');

    const mobile = appSize === 'mobile';
    const tablet = appSize === 'tablet';
    const desktop = appSize === 'desktop';
    const large = appSize === 'large';

    const getImageSize = () => {
        if (isForWidget) {
            if (mobile) return imageSizeMap.get('basketWidgetMobile').size;
            if (tablet) return imageSizeMap.get('basketWidgetTablet').size;
            if (desktop) return imageSizeMap.get('basketWidgetDesktop').size;
            if (large) return imageSizeMap.get('basketWidgetLarge').size;
        } else {
            if (mobile) return imageSizeMap.get('basketMobile').size;
            if (tablet) return imageSizeMap.get('basketTablet').size;
            if (desktop) return imageSizeMap.get('basketDesktop').size;
            if (large) return imageSizeMap.get('basketLarge').size;
        }

        return imageSizeMap.get('basketMobile').size;
    };

    const renderContentForWidget = () => (
        <div className="BasketItem__content">
            <div className="BasketItem__title-wrapper">
                <div className="title">{name}</div>

                {!isPromo ? <ReactSVG src={trashIcon} className="trash-icon icon-fix" onClick={() => onDelete(id)} /> : ''}
            </div>

            <div className="BasketItem__compound">
                {formattedDescription}
            </div>

            <div className="BasketItem__control">
                {!isPromo ? <BasketCounter count={quantity} onChange={onChangeCount} /> : <div />}

                {!isNoPromoPrice ? (
                    <div className="BasketItem__price price">
                        {`${Math.ceil(price * quantity).toLocaleString()} ₽`}
                    </div>
                ) : ''}
            </div>
        </div>
    );

    const renderContentForBasket = () => (
        <div className="BasketItem__content">
            <div className="BasketItem__content-all">
                <div className="BasketItem__content-base">
                    <div className="BasketItem__title">{name}</div>

                    <div className="BasketItem__compound">
                        {formattedDescription}
                    </div>

                    <div className="BasketItem__weight">
                        {weight ? `${weight} ${currentWeightType.label}` : ''}
                    </div>
                </div>

                <div className="BasketItem__second-line">
                    {!isPromo ? <BasketCounter count={quantity} onChange={onChangeCount} /> : ''}

                    {!isNoPromoPrice ? (
                        <div className="BasketItem__price price">
                            {`${Math.ceil(price * quantity).toLocaleString()} ₽`}
                        </div>
                    ) : ''}
                </div>
            </div>
            {!isPromo ? <ReactSVG src={trashIcon} className="trash-icon icon-fix" onClick={() => onDelete(id, product.id)} /> : ''}
        </div>
    );

    return (
        <div className={`BasketItem BasketItem-${useFor}`}>
            <div className="BasketItem__img-wrapper">
                <img
                    src={images.length ? images[0][getImageSize()] : defaultProductImg}
                    className="BasketItem__img"
                    alt="product_img"
                />
            </div>

            {isForWidget ? renderContentForWidget() : renderContentForBasket()}
        </div>
    );
};

BasketItem.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    item: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChangeCount: PropTypes.func.isRequired,
    useFor: PropTypes.oneOf(['basket', 'basket-widget']).isRequired,
};

export default BasketItem;
