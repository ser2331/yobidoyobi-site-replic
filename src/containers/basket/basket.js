import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as _ from 'lodash';
import Types from '../../classes/types';
import { app as appActions, basket as basketActions } from '../../store/actions';
import { gaDataLayerPush, getProductsMapByGroups } from '../../utils';
import BasketHeader from '../../components/basket-header';
import BasketLineIndicator from '../../components/basket-line-indicator';
import BasketStep1 from '../basket-step-1';
import BasketStep2 from '../basket-step-2';
import BasketStep3 from '../basket-step-3';
import BasketFooter from '../../components/basket-footer';
import OrderAmountModal from '../../components/order-amount-modal';
import BirthdayModal from '../../components/birthday-modal';

import './basket.scss';

const { routingMap } = Types;

const Basket = () => {
    const step = useSelector((state) => _.get(state, 'basket.step', 1));
    const showOrderAmountModal = useSelector((state) => _.get(state, 'app.showOrderAmountModal'));
    const city = useSelector((state) => _.get(state, 'app.city'));
    const organizationData = useSelector((state) => _.get(state, 'organization.organizationData'));
    const isStage = useSelector((state) => _.get(state, 'app.isStage', false));
    const showBirthdayModal = useSelector((state) => _.get(state, 'basket.showBirthdayModal'));
    const currentBasket = useSelector((state) => _.get(state, 'basket.currentBasket'));
    const productGroups = useSelector((state) => _.get(state, 'products.groups'));
    const promoCode = useSelector((state) => _.get(state, 'basket.promoCode'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { is_working, id: organizationId } = organizationData;
    const isSleep = organizationId && !is_working && isStage;

    useEffect(() => {
        const mapLink = (path = routingMap.get('location').path) => {
            const { slug } = city;
            return slug ? `/${slug}${path}` : routingMap.get('location').path;
        };

        if (isSleep) {
            navigate(mapLink(routingMap.get('home').path));
            dispatch(appActions.showSleepModal(true));
        }

        return () => {
            dispatch(basketActions.setStep(1));
        };
    }, [dispatch, navigate, city, isSleep]);

    useEffect(() => {
        const productsMap = getProductsMapByGroups(productGroups);

        if (productsMap.size) {
            gaDataLayerPush('autoEvent', {
                eventCategory: 'Ecommerce',
                eventAction: 'begin',
                ecommerce: {
                    checkout: {
                        actionField: {},
                        products: (currentBasket.cartProduct || []).map(({ product, quantity }) => {
                            const currentProduct = productsMap.get(product.id);
                            return {
                                id: currentProduct.id,
                                name: currentProduct.name,
                                category: currentProduct.groupName,
                                price: currentProduct.price,
                                quantity,
                                coupon: promoCode || '',
                            };
                        }),
                    },
                },
            });
        }
    }, []);

    return (
        <div className="Basket">
            <BasketHeader activeStep={step} />
            <BasketLineIndicator activeStep={step} />
            { (step === 1) && <BasketStep1 /> }
            { (step === 2) && <BasketStep2 /> }
            { (step === 3) && <BasketStep3 /> }
            { (step === 1 || step === 2) && <BasketFooter step={step} /> }
            { (false && showOrderAmountModal) && <OrderAmountModal /> }
            { showBirthdayModal && <BirthdayModal /> }
        </div>
    );
};
export default Basket;
