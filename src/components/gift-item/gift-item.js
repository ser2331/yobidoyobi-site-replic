import React from 'react';
import * as PropTypes from 'prop-types';
import CustomCheckbox from '../custom-checkbox';
import defaultProductImg from '../../assets/images/default-product.svg';

import './gift-item.scss';

const GiftItem = ({ itemData, price, id, changeGift, selectedGiftId }) => {
    const { name, description, images } = itemData;
    const src = images.length && images[0].original ? images[0].original : defaultProductImg;

    return (
        <div className="GiftItem">
            <CustomCheckbox
                onChange={() => changeGift(id)}
                checked={selectedGiftId === id}
            />

            <div className="GiftItem__img-wrapper">
                <img
                    src={src}
                    className="GiftItem__img"
                    alt="product_img"
                />
            </div>

            <div className="GiftItem__content">
                <div className="GiftItem__title">{name}</div>

                <div className="GiftItem__compound">
                    {description.split(',').join(', ')}
                </div>

                <div className="GiftItem__price">
                    {`от ${Math.ceil(price).toLocaleString()} ₽`}
                </div>
            </div>
        </div>
    );
};

GiftItem.defaultProps = {
    selectedGiftId: null,
};

GiftItem.propTypes = {
    changeGift: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    itemData: PropTypes.object.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    selectedGiftId: PropTypes.number,
};

export default GiftItem;
