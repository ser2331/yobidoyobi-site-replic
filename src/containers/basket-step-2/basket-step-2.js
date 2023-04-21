import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import ApiService from '../../classes/api-service';
import Types from '../../classes/types';
import { app as appActions, basket as basketActions } from '../../store/actions';
import { gaDataLayerPush, getProductsMapByGroups } from '../../utils';
import BasketStep2Header from '../../components/basket-step-2-header';
import BasketOrderForm from '../../components/basket-order-form';

import './basket-step-2.scss';

const { updateDeliverySlotsInterval } = Types;

let timer = null;
let deliverySlotsTimer = null;

const BasketStep2 = () => {
    const [resendTimer, setResendTimer] = useState(0);
    const [deliverySlotsOptions, setDeliverySlotsOptions] = useState([]);

    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const payment = useSelector((state) => _.get(state, 'basket.payment'));
    const userData = useSelector((state) => _.get(state, 'app.userData'));
    const appSize = useSelector((state) => _.get(state, 'app.appSize'));
    const city = useSelector((state) => _.get(state, 'app.city'));
    const organizationData = useSelector((state) => _.get(state, 'organization.organizationData'));
    const orderData = useSelector((state) => _.get(state, 'basket.orderData'));
    const productGroups = useSelector((state) => _.get(state, 'products.groups'));
    const promoCode = useSelector((state) => _.get(state, 'basket.promoCode'));
    const dispatch = useDispatch();

    const { deliveryType } = currentBasket;
    const { id: companyId } = organizationData;
    const { deliveryTime } = orderData;

    useEffect(() => {
        const apiService = new ApiService(city.slug || 'krasnoyarsk');

        const getSlots = () => {
            apiService.getDeliverySlots(companyId)
                .then((slotsResult) => {
                    const slotsOptions = slotsResult.data.map((it) => ({ key: it, value: it }));
                    setDeliverySlotsOptions(slotsOptions);

                    if (deliveryTime) {
                        const currentSlotsOption = slotsOptions.find(({ value }) => value === deliveryTime);
                        if (currentSlotsOption) return;
                        dispatch(basketActions.setDeliveryTime(slotsOptions[0]?.value || ''));
                    } else {
                        dispatch(basketActions.setDeliveryTime(slotsOptions[0]?.value || ''));
                    }
                })
                .catch((err) => {
                    if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
                    dispatch(appActions.setAppError('Не удалось получить интервалы доставки. Попробуйте пожалуйста ещё раз'));
                });
        };

        if (companyId) {
            getSlots();
            deliverySlotsTimer = setInterval(() => getSlots(), updateDeliverySlotsInterval);
        }

        return () => clearInterval(deliverySlotsTimer);
    }, [city, companyId, dispatch]);

    useEffect(() => {
        if (resendTimer) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        }

        return () => clearTimeout(timer);
    }, [resendTimer]);

    useEffect(() => {
        const productsMap = getProductsMapByGroups(productGroups);

        if (productsMap.size) {
            gaDataLayerPush('progress', {
                items: (currentBasket.cartProduct || []).map(({ product, quantity }) => {
                    const currentProduct = productsMap.get(product.id);
                    return {
                        id: currentProduct.id,
                        name: currentProduct.name,
                        category: currentProduct.groupName,
                        price: currentProduct.price,
                        quantity,
                    };
                }),
                coupon: promoCode || '',
            });
        }
    }, []);

    const onSendSms = (phoneNumber, captchaToken) => {
        dispatch(appActions.getAuthorizationCode(String(phoneNumber), captchaToken));
        setResendTimer(10);
    };

    const onCheckCode = (code) => {
        const phoneNumber = userData.unverifiedPhone;
        dispatch(appActions.getAuthorizationKeys(String(phoneNumber), String(code)));
    };

    const onResend = () => {
        if (!resendTimer) setResendTimer(10);
        const phoneNumber = String(userData.unverifiedPhone);
        dispatch(appActions.getAuthorizationCode(String(phoneNumber)));
    };

    return (
        <div className="BasketStep2">
            <BasketStep2Header />
            <BasketOrderForm
                deliveryType={deliveryType}
                onChangePayment={(key) => dispatch(basketActions.updatePayment(key))}
                payment={payment}
                resendTimer={resendTimer}
                onSendSms={onSendSms}
                onCheckCode={onCheckCode}
                onResend={onResend}
                appSize={appSize}
                deliverySlotsOptions={deliverySlotsOptions}
            />
        </div>
    );
};

export default BasketStep2;
