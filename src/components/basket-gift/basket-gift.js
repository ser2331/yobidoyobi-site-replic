import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { basket as basketActions } from '../../store/actions';
import GiftItem from '../gift-item';
import errorIcon from '../../assets/images/form-error.svg';

import './basket-gift.scss';

const BasketGift = () => {
    const dispatch = useDispatch();
    const giftItems = useSelector((state) => _.get(state, 'basket.gifts'));
    const sum = useSelector((state) => _.get(state, 'basket.sum'));
    const giftId = useSelector((state) => _.get(state, 'basket.giftId'));
    const organizationData = useSelector((state) => _.get(state, 'organization.organizationData'));

    const visibleGifts = giftItems?.filter((item) => item.price <= sum);
    const unselectedGift = !((visibleGifts.length && giftId) || !visibleGifts.length);

    const changeGift = (id) => {
        dispatch(basketActions.updateGiftId(id));
    };

    useEffect(() => {
        if (organizationData.id) {
            dispatch(basketActions.getGifts());
        }
    }, [dispatch, organizationData]);

    useEffect(() => {
        const selectedInvisibleGift = !visibleGifts.find(({ id }) => id === giftId);

        if (selectedInvisibleGift && giftId) {
            dispatch(basketActions.updateGiftId());
        }
    }, [dispatch, visibleGifts, giftId]);

    const renderContent = () => (
        <div className={classNames('BasketGift__wrapper', { unselectedGift })}>
            <div className="BasketGift basket-container">
                <div className="BasketGift__title">
                    Выберите свой подарок

                    {unselectedGift && <ReactSVG src={errorIcon} className="BasketGift__title-error icon-fix" />}
                </div>

                <div className="basket-divider" />

                <div className="BasketGift__items">
                    {giftItems.map(({ price, product, id }) => (sum > price ? (
                        <GiftItem
                            changeGift={changeGift}
                            itemData={product}
                            price={price}
                            key={id}
                            id={id}
                            selectedGiftId={giftId}
                        />
                    ) : ''))}
                </div>

            </div>
        </div>
    );

    return (visibleGifts.length ? renderContent() : '');
};

export default BasketGift;
