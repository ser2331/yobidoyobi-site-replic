import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { basket as basketActions } from '../../store/actions';
import Types from '../../classes/types';
import { gaDataLayerPush } from '../../utils';
import CustomButton from '../custom-button';
import ProductIndicator from '../product-modal/components/product-indicator';
import Tooltip from '../tooltip';
import LazyProductImage from '../lazy-product-image';

import './product-group.scss';

const { productIndicatorMap, weightUnitsMap, imageSizeMap } = Types;

const ProductGroup = ({ group, setModal }) => {
    const dispatch = useDispatch();
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const promoCode = useSelector((state) => _.get(state, 'basket.promoCode'));

    const { cartProduct } = currentBasket;

    const { id: groupId, items } = group;

    if (!items) return null;

    const mobile = appSize === 'mobile';
    const tablet = appSize === 'tablet';
    const desktop = appSize === 'desktop';
    const large = appSize === 'large';

    const setModalId = (itemId, item) => {
        setModal({ group: group.id, item: itemId });

        if (item) {
            gaDataLayerPush('view_item', {
                items: [{
                    id: item.id,
                    name: item.name,
                    category: group.name,
                    price: item.price,
                }],
                coupon: promoCode || '',
            });
        }
    };

    const getImageSize = () => {
        if (mobile) return imageSizeMap.get('productMobile').size;
        if (tablet) return imageSizeMap.get('productTablet').size;
        if (desktop) return imageSizeMap.get('productDesktop').size;
        if (large) return imageSizeMap.get('productLarge').size;

        return imageSizeMap.get('productLarge').size;
    };

    const getSpan = () => {
        switch (appSize) {
        case 'mobile':
            return 24;

        case 'tablet':
            return 8;

        case 'desktop':
            return 6;

        case 'large':
            return 6;

        default:
            return 8;
        }
    };

    const renderTooltip = (foodValues) => (
        <Tooltip
            placement="bottomRight"
            arrowPointAtCenter
            overlayClassName="product-card-tooltip"
            color={getComputedStyle(document.documentElement).getPropertyValue('--ui-dark')}
            overlayInnerStyle={{ borderRadius: 2 }}
        >
            <div className="tooltip-inner">
                <div className="tooltip-inner__title">
                    Пищевая ценность на 100 гр.
                </div>

                {foodValues.map(({ label, value }) => (
                    <div className="tooltip-inner__row" key={label}>
                        <div className="label">{label ? `${label}:` : ''}</div>
                        <div className="value">{value || ''}</div>
                    </div>
                ))}
            </div>
        </Tooltip>
    );

    const renderItemDescriptionRow = (itemIdInBasket, currentWeightType, price, oldPrice, weight, id) => (
        <div className="ProductGroup__item__description-row">
            <div className="weight">{weight ? `${weight} ${currentWeightType.label}` : ''}</div>

            <div className="old-price">
                <span className="value">{oldPrice ? `${Math.ceil(oldPrice).toLocaleString()}₽` : ''}</span>
            </div>

            <CustomButton
                onClick={() => dispatch(basketActions.addBasketProduct(id, 1))}
                type={itemIdInBasket ? 'green-outline' : 'red-outline'}
                className="price"
            >
                {itemIdInBasket ? 'Ещё' : ''}
                {price && !itemIdInBasket ? `${Math.ceil(price).toLocaleString()} ₽` : ''}
            </CustomButton>

        </div>
    );

    const renderItem = (item) => {
        const {
            carbohydratesAmount,
            energyAmount,
            fatAmount,
            id,
            is_hot: isHot,
            is_new: isNew,
            is_recommended: isRecommended,
            is_spicy: isSpicy,
            name,
            oldPrice,
            price,
            proteinsAmount,
            weight,
            images,
            weight_unit: weightUnit,
        } = item;
        const foodValues = [
            { label: 'Энерг. ценность', value: `${energyAmount} калл` },
            { label: 'Белки', value: `${proteinsAmount} гр.` },
            { label: 'Жиры', value: `${fatAmount} гр.` },
            { label: 'Углеводы', value: `${carbohydratesAmount} гр.` },
        ];

        const itemIdInBasket = cartProduct?.find((i) => i.product.id === id);
        const currentWeightType = weightUnitsMap.get(weightUnit) || weightUnitsMap.get('gr');

        return (
            <Col span={getSpan()} className="ProductGroup__item-wrapper" key={id}>
                <div className="ProductGroup__item">
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                    <div className="ProductGroup__item__img-wrapper" onClick={() => setModalId(id)}>
                        <LazyProductImage images={images} name={name} getImageSize={getImageSize} />
                    </div>

                    <div className="ProductGroup__item__top-zone">
                        <div className="ProductGroup__item__name product-card-name">{name || ''}</div>
                        <div className="tooltip-wrapper">
                            {renderTooltip(foodValues)}
                        </div>
                    </div>

                    {renderItemDescriptionRow(itemIdInBasket, currentWeightType, price, oldPrice, weight, id)}

                    <div className="ProductGroup__item__product-indicator-wrapper">
                        {isHot ? <ProductIndicator type={productIndicatorMap.get('hot').type} /> : ''}
                        {isNew ? <ProductIndicator type={productIndicatorMap.get('new').type} /> : ''}
                        {isRecommended ? <ProductIndicator type={productIndicatorMap.get('recommended').type} /> : ''}
                        {isSpicy ? <ProductIndicator type={productIndicatorMap.get('spicy').type} /> : ''}
                    </div>
                </div>
            </Col>
        );
    };

    const renderItemMobile = (item) => {
        const {
            carbohydratesAmount,
            energyAmount,
            fatAmount,
            id,
            is_hot: isHot,
            is_new: isNew,
            is_recommended: isRecommended,
            is_spicy: isSpicy,
            name,
            oldPrice,
            price,
            proteinsAmount,
            weight,
            images,
            weight_unit: weightUnit,
        } = item;
        const foodValues = [
            { label: 'Энерг. ценность', value: `${energyAmount} калл` },
            { label: 'Белки', value: `${proteinsAmount} гр.` },
            { label: 'Жиры', value: `${fatAmount} гр.` },
            { label: 'Углеводы', value: `${carbohydratesAmount} гр.` },
        ];
        const itemIdInBasket = cartProduct?.find((i) => i.product.id === id);
        const currentWeightType = weightUnitsMap.get(weightUnit) || weightUnitsMap.get('gr');

        return (
            <Col span={getSpan()} className="ProductGroup__item-wrapper" key={id}>
                <div className="ProductGroup__item">
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                    <div className="ProductGroup__item__img-wrapper" onClick={() => setModalId(id)}>
                        <LazyProductImage images={images} name={name} getImageSize={getImageSize} />
                    </div>

                    <div className="ProductGroup__item__right-zone">
                        <div className="ProductGroup__item__top-zone">
                            <div className="ProductGroup__item__name product-card-name">{name || ''}</div>
                            <div className="tooltip-wrapper">
                                {renderTooltip(foodValues)}
                            </div>
                        </div>

                        {renderItemDescriptionRow(itemIdInBasket, currentWeightType, price, oldPrice, weight, id)}
                    </div>

                    <div className="ProductGroup__item__product-indicator-wrapper">
                        {isHot ? <ProductIndicator type={productIndicatorMap.get('hot').type} /> : ''}
                        {isNew ? <ProductIndicator type={productIndicatorMap.get('new').type} /> : ''}
                        {isRecommended ? <ProductIndicator type={productIndicatorMap.get('recommended').type} /> : ''}
                        {isSpicy ? <ProductIndicator type={productIndicatorMap.get('spicy').type} /> : ''}
                    </div>
                </div>
            </Col>
        );
    };

    return (
        <div className="ProductGroup container" id={groupId}>
            <div className="ProductGroup__name">
                {group.name}
            </div>

            <Row gutter={[12, 24]} className="ProductGroup__items">
                {mobile ? items.map(renderItemMobile) : items.map(renderItem)}
            </Row>
        </div>
    );
};

ProductGroup.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    group: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired,
};

export default ProductGroup;
