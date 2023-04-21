import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as _ from 'lodash';
import { basket as basketActions } from '../../store/actions';
import CustomButton from '../custom-button';
import PromoCode from '../promo-code';
import Types from '../../classes/types';

import './basket-footer.scss';

const { routingMap, deliveryTypesMap, birthdayOptionsMap } = Types;

const BasketFooter = ({ step }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const city = useSelector((state) => _.get(state, 'app.city'));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const isAuth = useSelector((state) => _.get(state, 'app.isAuth'));
    const orderData = useSelector((state) => _.get(state, 'basket.orderData'));
    const sum = useSelector((state) => _.get(state, 'basket.sum'));
    const giftId = useSelector((state) => _.get(state, 'basket.giftId'));
    const birthday = useSelector((state) => _.get(state, 'basket.orderData.birthday'));
    const giftItems = useSelector((state) => _.get(state, 'basket.gifts'));

    const { cartProduct, cartId: basketId, deliveryType, deliveryCost, diffCost, excludeDelivery } = currentBasket;
    const isGift = giftItems?.find((item) => item.price <= sum);

    const unselectedGift = ((isGift && giftId) || !isGift);

    const isStep1 = step === 1;
    const isStep2 = step === 2;

    const mobile = appSize === 'mobile';

    const isBirthday = birthday === birthdayOptionsMap.get('birthday').type;
    const isDelivery = deliveryType === deliveryTypesMap.get('delivery').value;
    const isPickup = deliveryType === deliveryTypesMap.get('pickup').value;

    const getConfirmIndicator = () => {
        if (isStep1 && cartProduct.length && basketId && unselectedGift) {
            return false;
        }
        if (isStep2 && isDelivery && basketId && isAuth && orderData.userName && orderData.deliveryTime && ((sum - deliveryCost) > 0)) {
            return false;
        }
        if (isStep2 && isPickup && basketId && isAuth && orderData.userName && (sum > 0)) {
            return false;
        }
        return true;
    };

    const setNextStep = () => {
        if (isStep1) {
            dispatch(basketActions.setStep(2));
            return;
        }

        if (isStep2 && ((isBirthday && giftId))) {
            dispatch(basketActions.showBirthdayModal(true));
            return;
        }

        dispatch(basketActions.createOrder());
    };

    const mapLink = (path = routingMap.get('location').path) => {
        const { slug } = city;
        return slug ? `/${slug}${path}` : routingMap.get('location').path;
    };

    const onBack = () => {
        if (isStep1) {
            navigate(mapLink(routingMap.get('home').path));
        } else {
            dispatch(basketActions.setStep(1));
        }
    };

    const renderDeliveryOrderControl = () => (
        <div>
            <div className="delivery">
                {`+ ${deliveryCost} ₽ Доставка`}
            </div>

            {!excludeDelivery ? (
                <div className="sum-wrapper__remaining">
                    Для того чтобы доставка стала бесплатной пополните корзину на сумму
                    {` ${diffCost} ₽`}
                </div>
            ) : <div className="sum-wrapper__remaining" />}
        </div>
    );

    return (
        <div className="BasketFooter">
            <div className="BasketFooter__content basket-container">
                <div className={classNames('BasketFooter__row', { totalMobile: mobile })}>
                    <PromoCode />

                    <div className="BasketFooter__total">
                        {
                            mobile
                                ? (
                                    <div className="sum">
                                        <div>Сумма:</div>
                                        <div>
                                            <div>
                                                {` ${sum || 0} ₽ `}
                                            </div>
                                            {isDelivery ? renderDeliveryOrderControl() : ''}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="sum-wrapper">
                                        <div className="sum-wrapper__sum">
                                            {`Итоговая сумма: ${(sum - deliveryCost) || '0'} ₽ `}
                                        </div>

                                        {isDelivery ? renderDeliveryOrderControl() : ''}
                                    </div>
                                )
                        }
                    </div>
                </div>

                <div className={classNames('BasketFooter__row', { buttonsMobile: mobile })}>
                    <CustomButton
                        onClick={onBack}
                        className="back-button basket-footer-button"
                    >
                        { isStep1 && 'Вернуться на главную' }
                        { isStep2 && 'Вернуться назад' }
                    </CustomButton>

                    <CustomButton
                        onClick={setNextStep}
                        type="red"
                        className="apply-button basket-footer-button"
                        disabled={getConfirmIndicator()}
                    >
                        подтвердить заказ
                    </CustomButton>
                </div>
            </div>
        </div>
    );
};

BasketFooter.propTypes = {
    step: PropTypes.number.isRequired,
};

export default BasketFooter;
