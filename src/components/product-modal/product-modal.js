import React from 'react';
import { Modal } from 'antd';
import { ReactSVG } from 'react-svg';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { basket as basketActions } from '../../store/actions';
import Types from '../../classes/types';
import CustomButton from '../custom-button';
import ProductIndicator from './components/product-indicator';
import closeIcon from '../../assets/images/close.svg';
import defaultProductImg from '../../assets/images/default-product.svg';

import './product-modal.scss';

const { productIndicatorMap, weightUnitsMap, imageSizeMap } = Types;

const ProductModal = ({ modalId, onClose }) => {
    const dispatch = useDispatch();
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const productGroups = useSelector((state) => _.get(state, 'products.groups'));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));

    const { cartProduct } = currentBasket;

    const { group, item } = modalId;
    const currentGroup = productGroups.find(({ id }) => id === group);
    if (!currentGroup) return null;

    const currentItem = currentGroup.items.find(({ id }) => id === item);
    if (!currentItem) return null;

    const mobile = appSize === 'mobile';
    const tablet = appSize === 'tablet';
    const desktop = appSize === 'desktop';
    const large = appSize === 'large';

    const getImageSize = () => {
        if (mobile) return imageSizeMap.get('productModalMobile').size;
        if (tablet) return imageSizeMap.get('productModalTablet').size;
        if (desktop) return imageSizeMap.get('productModalDesktop').size;
        if (large) return imageSizeMap.get('productModalLarge').size;

        return imageSizeMap.get('productModalDesktop').size;
    };

    const {
        id,
        carbohydratesAmount,
        energyAmount,
        fatAmount,
        is_hot: isHot,
        is_new: isNew,
        is_recommended: isRecommended,
        is_spicy: isSpicy,
        name,
        oldPrice,
        price,
        proteinsAmount,
        weight,
        description,
        images,
        weight_unit: weightUnit,
    } = currentItem;
    const foodValues = [
        { label: 'Энерг. ценность', value: `${energyAmount} калл` },
        { label: 'Белки', value: `${proteinsAmount} гр.` },
        { label: 'Жиры', value: `${fatAmount} гр.` },
        { label: 'Углеводы', value: `${carbohydratesAmount} гр.` },
    ];
    const itemIdInBasket = cartProduct.find((i) => i.product.id === id);
    const currentWeightType = weightUnitsMap.get(weightUnit) || weightUnitsMap.get('gr');

    return (
        <Modal
            visible={!!currentItem}
            onCancel={onClose}
            footer={null}
            closeIcon={<ReactSVG src={closeIcon} className="close-icon" />}
            wrapClassName="ProductModal__wrap"
            centered
        >
            <div className="ProductModal">
                <div className="ProductModal__image-wrapper">
                    <img
                        src={images.length ? images[0][getImageSize()] : defaultProductImg}
                        alt={name}
                    />
                </div>

                <div className="ProductModal__description">
                    <div className="ProductModal__name product-card-name">{name}</div>
                    <div className="ProductModal__pricing">
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
                </div>

                <div className="ProductModal__compounds">
                    <div className="compounds-item">
                        {description}
                        {isHot ? <ProductIndicator type={productIndicatorMap.get('hot').type} /> : ''}
                        {isNew ? <ProductIndicator type={productIndicatorMap.get('new').type} /> : ''}
                        {isRecommended ? <ProductIndicator type={productIndicatorMap.get('recommended').type} /> : ''}
                        {isSpicy ? <ProductIndicator type={productIndicatorMap.get('spicy').type} /> : ''}
                    </div>
                </div>

                <div className="ProductModal__food-values">
                    <div className="title">Пищевая ценность на 100 г:</div>
                    <div className="value">
                        {foodValues.map(({ label, value }, idx) => (
                            <span className="value-part" key={label}>
                                {`${idx === 0 ? label : label.toLowerCase()}: ${value}`}
                                {idx < (foodValues.length - 1) ? ', ' : ''}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="ProductModal__weight">{weight ? `${weight} ${currentWeightType.label}` : ''}</div>
            </div>
        </Modal>
    );
};

ProductModal.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    modalId: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ProductModal;
