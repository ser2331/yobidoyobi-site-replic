import * as _ from 'lodash';
import { batch } from 'react-redux';
import { organization as organizationActions, app as appActions } from '..';
import Types from '../../../classes/types';
import CurrentBasketModel from '../../../models/current-basket';
import { mapBasketResToModel, gaDataLayerPush, getProductsMapByGroups } from '../../../utils';

const { paymentOptionsMap, birthdayOptionsMap } = Types;

export const BASKET_SET_CURRENT_BASKET = 'BASKET_SET_CURRENT_BASKET';
export const BASKET_STEP = 'BASKET_STEP';
export const BASKET_SET_ADDRESS_HINT = 'BASKET_SET_ADDRESS_HINT';
export const BASKET_SET_PERSON_COUNT = 'BASKET_SET_PERSON_COUNT';
export const BASKET_SET_PAYMENT = 'BASKET_SET_PAYMENT';
export const BASKET_SET_ORDER_NAME = 'BASKET_SET_ORDER_NAME';
export const BASKET_SET_ORDER_CHANGE = 'BASKET_SET_ORDER_CHANGE';
export const BASKET_SET_BIRTHDAY = 'BASKET_SET_BIRTHDAY';
export const BASKET_SET_ORDER_COMMENT = 'BASKET_SET_ORDER_COMMENT';
export const BASKET_SET_DELIVERY_TIME = 'BASKET_SET_DELIVERY_TIME';
export const BASKET_SET_GIFTS = 'BASKET_SET_GIFTS';
export const BASKET_SET_GIFT_ID = 'BASKET_SET_GIFT_ID';
export const BASKET_SET_TOTAL_SUM = 'BASKET_SET_TOTAL_SUM';
export const BASKET_SET_USER_ADDRESSES = 'BASKET_SET_USER_ADDRESSES';
export const BASKET_SHOW_SAUCES_MODAL = 'BASKET_SHOW_SAUCES_MODAL';
export const BASKET_SET_USER_ORDERS = 'BASKET_SET_USER_ORDERS';
export const BASKET_SHOW_BIRTHDAY_MODAL = 'BASKET_SHOW_BIRTHDAY_MODAL';

export const setTotalSum = (payload = 0) => ({
    type: BASKET_SET_TOTAL_SUM,
    payload,
});

export const setCurrentBasket = (payload = new CurrentBasketModel()) => ({
    type: BASKET_SET_CURRENT_BASKET,
    payload,
});

export const showBirthdayModal = (payload = false) => ({
    type: BASKET_SHOW_BIRTHDAY_MODAL,
    payload,
});

export const getTotalSum = () => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken', '');
    const cartId = _.get(getState(), 'basket.currentBasket.cartId');
    const personCount = _.get(getState(), 'basket.personCount', '');
    const payType = _.get(getState(), 'basket.payment', '');
    const giftId = _.get(getState(), 'basket.giftId', '');
    const orderData = _.get(getState(), 'basket.orderData', {});

    const { comment, birthday, change } = orderData;

    createApiService(getState).getTotalSum(
        accessToken,
        cartId,
        giftId,
        payType,
        personCount,
        birthday,
        comment,
        change,
    )
        .then((res) => {
            const { sum } = res.data;
            dispatch(setTotalSum(sum));
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось получить сумму заказа. Попробуйте пожалуйста ещё раз'));
        });
};

export const updateBasket = (nextBasket) => (dispatch) => {
    dispatch(setCurrentBasket(nextBasket));
    dispatch(getTotalSum());
};

export const setStep = (payload = 1) => ({
    type: BASKET_STEP,
    payload,
});

export const setAddressHint = (payload = { value: '', data: {} }) => ({
    type: BASKET_SET_ADDRESS_HINT,
    payload,
});

export const setPersonCount = (payload = 1) => ({
    type: BASKET_SET_PERSON_COUNT,
    payload,
});

export const updatePersonCount = (payload) => (dispatch) => {
    dispatch(setPersonCount(payload));
    dispatch(getTotalSum());
};

export const setPayment = (payload = paymentOptionsMap.get('cash').type) => ({
    type: BASKET_SET_PAYMENT,
    payload,
});

export const updatePayment = (payload) => (dispatch) => {
    dispatch(setPayment(payload));
    dispatch(getTotalSum());
};

export const setOrderName = (payload = '') => ({
    type: BASKET_SET_ORDER_NAME,
    payload,
});

export const setOrderChange = (payload = '') => ({
    type: BASKET_SET_ORDER_CHANGE,
    payload,
});

export const setBirthday = (payload = birthdayOptionsMap.get('noBirthday').type) => ({
    type: BASKET_SET_BIRTHDAY,
    payload,
});

export const updateBirthday = (payload) => (dispatch) => {
    dispatch(setBirthday(payload));
    dispatch(getTotalSum());
};

export const setOrderComment = (payload = '') => ({
    type: BASKET_SET_ORDER_COMMENT,
    payload,
});

export const setDeliveryTime = (payload = '') => ({
    type: BASKET_SET_DELIVERY_TIME,
    payload,
});

export const setGifts = (payload = []) => ({
    type: BASKET_SET_GIFTS,
    payload,
});

export const getGifts = () => (dispatch, getState, createApiService) => {
    const organizationData = _.get(getState(), 'organization.organizationData');
    const { id } = organizationData;

    createApiService(getState).getGifts(id)
        .then((res) => {
            const giftsArray = res.data.data;
            if (Array.isArray(giftsArray) && giftsArray.length) {
                dispatch(setGifts(res.data.data[0]));
            }
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось получить список доступных подарков. Попробуйте пожалуйста ещё раз'));
        });
};

export const setGiftId = (payload = null) => ({
    type: BASKET_SET_GIFT_ID,
    payload,
});

export const updateGiftId = (payload) => (dispatch) => {
    dispatch(setGiftId(payload));
    dispatch(getTotalSum());
};

export const setUserAddresses = (payload = []) => ({
    type: BASKET_SET_USER_ADDRESSES,
    payload,
});

export const getUserAddresses = () => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken', '');

    createApiService(getState).getUserAddresses(accessToken)
        .then((res) => {
            dispatch(setUserAddresses(res.data.data));
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось получить список адресов пользователя. Попробуйте пожалуйста ещё раз'));
        });
};

export const showSaucesModal = (payload = false) => ({
    type: BASKET_SHOW_SAUCES_MODAL,
    payload,
});

export const addBasketProduct = (productId, quantity) => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken');
    const basketId = _.get(getState(), 'basket.currentBasket.cartId');
    const promoCode = _.get(getState(), 'basket.promoCode');
    const organizationData = _.get(getState(), 'organization.organizationData');
    const isStage = _.get(getState(), 'app.isStage');
    const isAuth = _.get(getState(), 'app.isAuth');
    const productGroups = _.get(getState(), 'products.groups', []);

    const { is_working, id: organizationId } = organizationData;
    const isSleep = organizationId && !is_working && isStage;

    if (isSleep) {
        dispatch(appActions.showSleepModal(true));
        return;
    }

    if (basketId) {
        createApiService(getState).addBasketProduct(accessToken, basketId, productId, quantity, isAuth)
            .then((res) => {
                const nextBasket = res.data.data;
                dispatch(updateBasket(mapBasketResToModel(nextBasket)));

                const productsMap = getProductsMapByGroups(productGroups);
                const currentProduct = productsMap.get(productId);

                if (currentProduct) {
                    gaDataLayerPush('autoEvent', {
                        eventCategory: 'Ecommerce',
                        eventAction: 'addToCart',
                        ecommerce: {
                            currencyCode: 'RUB',
                            add: {
                                products: [{
                                    id: currentProduct.id,
                                    name: currentProduct.name,
                                    category: currentProduct.groupName,
                                    price: currentProduct.price,
                                    quantity: 1,
                                    coupon: promoCode || '',
                                }],
                            },
                        },
                    });
                }
            })
            .catch((err) => {
                if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
                dispatch(appActions.setAppError('Не удалось добавить товар в корзину. Попробуйте пожалуйста ещё раз'));
            });
    } else {
        dispatch(appActions.showAddressModal(true));
    }
};

export const editBasketProduct = (productId, quantity) => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken', '');
    const basketId = _.get(getState(), 'basket.currentBasket.cartId', '');
    const organizationData = _.get(getState(), 'organization.organizationData');
    const isStage = _.get(getState(), 'app.isStage');
    const isAuth = _.get(getState(), 'app.isAuth');

    const { is_working, id: organizationId } = organizationData;
    const isSleep = organizationId && !is_working && isStage;

    if (isSleep) {
        dispatch(appActions.showSleepModal(true));
        return;
    }

    createApiService(getState).editBasketProduct(accessToken, basketId, productId, quantity, isAuth)
        .then((res) => {
            const nextBasket = res.data.data;
            dispatch(updateBasket(mapBasketResToModel(nextBasket)));
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось изменить товар в корзине. Попробуйте пожалуйста ещё раз'));
        });
};

export const deleteBasketProduct = (itemId, productId) => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken', '');
    const basketId = _.get(getState(), 'basket.currentBasket.cartId', '');
    const organizationData = _.get(getState(), 'organization.organizationData');
    const isStage = _.get(getState(), 'app.isStage');
    const isAuth = _.get(getState(), 'app.isAuth');
    const promoCode = _.get(getState(), 'basket.promoCode');
    const productGroups = _.get(getState(), 'products.groups', []);
    const currentBasket = _.get(getState(), 'basket.currentBasket');

    const { is_working, id: organizationId } = organizationData;
    const isSleep = organizationId && !is_working && isStage;

    if (isSleep) {
        dispatch(appActions.showSleepModal(true));
        return;
    }

    createApiService(getState).deleteBasketProduct(accessToken, basketId, itemId, isAuth)
        .then((res) => {
            const productsMap = getProductsMapByGroups(productGroups);

            if (productId) {
                const currentProduct = productsMap.get(productId);

                if (currentProduct) {
                    gaDataLayerPush('remove_from_cart', {
                        items: [{
                            id: currentProduct.id,
                            name: currentProduct.name,
                            category: currentProduct.groupName,
                            price: currentProduct.price,
                            quantity: 1,
                        }],
                        coupon: promoCode || '',
                    });
                }
            } else if (!itemId && !productId) {
                gaDataLayerPush('remove_from_cart', {
                    items: (currentBasket.cartProduct.filter((it) => !it.is_promo) || []).map(({ product, quantity }) => {
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

            const nextBasket = res.data.data;
            dispatch(updateBasket(mapBasketResToModel(nextBasket)));
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось удалить товар из корзины. Попробуйте пожалуйста ещё раз'));
        });
};

export const getCurrentBasket = () => (dispatch, getState, createApiService) => {
    const basketId = _.get(getState(), 'basket.currentBasket.cartId', '');

    createApiService(getState).getCurrentBasket(basketId)
        .then((res) => {
            const nextBasket = res.data.data;
            dispatch(updateBasket(mapBasketResToModel(nextBasket)));
        })
        .catch(() => dispatch(appActions.setAppError('Не удалось получить текущее состояние корзины. Попробуйте пожалуйста ещё раз')));
};

export const deleteUserAddress = (addressId) => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken', '');

    createApiService(getState).deleteUserAddress(accessToken, addressId)
        .then(() => {
            dispatch(getUserAddresses());
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось удалить адрес. Попробуйте пожалуйста ещё раз'));
        });
};

export const setUserOrders = (payload = []) => ({
    type: BASKET_SET_USER_ORDERS,
    payload,
});

export const getUserOrders = (status) => (dispatch, getState, createApiService) => {
    const apiService = createApiService(getState);
    const accessToken = _.get(getState(), 'app.accessToken');

    apiService.getUserOrders(accessToken, status)
        .then((res) => {
            dispatch(setUserOrders((res.data.data || []).sort((a, b) => b.number - a.number)));
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось загрузить текущие заказы. Повторите попытку позже'));
        });
};

export const resetBasket = () => (dispatch) => batch(() => {
    dispatch(setCurrentBasket());
    dispatch(setGifts());
    dispatch(setGiftId());
    dispatch(setAddressHint());
    dispatch(setPersonCount());
    dispatch(setPayment());
    dispatch(setOrderChange());
    dispatch(setOrderComment());
    dispatch(setDeliveryTime());
    dispatch(setBirthday());
    dispatch(setOrderName());
    dispatch(setTotalSum());
});

export const createOrder = () => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken', '');
    const basketId = _.get(getState(), 'basket.currentBasket.cartId', '');
    const personCount = _.get(getState(), 'basket.personCount', '');
    const payType = _.get(getState(), 'basket.payment', '');
    const giftId = _.get(getState(), 'basket.giftId', '');
    const orderData = _.get(getState(), 'basket.orderData', {});
    const zoneId = _.get(getState(), 'basket.zoneId', {});
    const organizationData = _.get(getState(), 'organization.organizationData');
    const promoCode = _.get(getState(), 'basket.promoCode');
    const isStage = _.get(getState(), 'app.isStage');
    const productGroups = _.get(getState(), 'products.groups', []);
    const currentBasket = _.get(getState(), 'basket.currentBasket');

    const { is_working, id: organizationId } = organizationData;
    const isSleep = organizationId && !is_working && isStage;

    const productsMap = getProductsMapByGroups(productGroups);

    if (isSleep) {
        dispatch(appActions.showSleepModal(true));
        return;
    }

    const { userName, comment, birthday, change, deliveryTime } = orderData;

    createApiService(getState).createOrder(accessToken, basketId, giftId, userName, comment, payType, personCount, birthday, change, zoneId, deliveryTime, promoCode)
        .then((res) => {
            const { number, final_sum: finalSum } = res.data.data;
            gaDataLayerPush('autoEvent', {
                eventCategory: 'Ecommerce',
                eventAction: 'purchase',
                eventLabel: number,
                eventValue: finalSum,
                ecommerce: {
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
            });

            dispatch(setStep(3));
            dispatch(resetBasket());
            dispatch(appActions.getCurrentUserData());
            dispatch(getUserOrders());
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось оформить заказ. Попробуйте пожалуйста ещё раз'));
        });
};

export const setDelivery = (deliveryAddressModel, newPromoCode) => (dispatch, getState, createApiService) => {
    const apiService = createApiService(getState);

    const isAuth = _.get(getState(), 'app.isAuth');
    const accessToken = _.get(getState(), 'app.accessToken');
    const currentBasket = _.get(getState(), 'basket.currentBasket');
    const organizationsList = _.get(getState(), 'organization.organizationsList', []);
    const organizationData = _.get(getState(), 'organization.organizationData');
    const isStage = _.get(getState(), 'app.isStage');

    const { is_working, id: organizationId } = organizationData;
    const isSleep = organizationId && !is_working && isStage;

    if (isSleep) {
        dispatch(appActions.showSleepModal(true));
        return;
    }

    const { cartId, promoCode } = currentBasket;
    const { id: addressId } = deliveryAddressModel;

    const isNeedToApplyPromoCode = typeof newPromoCode !== 'undefined';
    const currentPromoCode = isNeedToApplyPromoCode ? newPromoCode : promoCode;

    const patchDeliveryBasket = (companyId, newUserAddressId, code) => {
        apiService.patchDeliveryBasket(accessToken, cartId, companyId, deliveryAddressModel, newUserAddressId || addressId, isAuth, code)
            .then((basketResult) => {
                const nextBasket = basketResult.data.data;
                const nextOrganization = organizationsList.find((o) => o.id === companyId);
                batch(() => {
                    dispatch(updateBasket(mapBasketResToModel(nextBasket)));
                    dispatch(organizationActions.setOrganizationData(nextOrganization));
                });
            })
            .catch((err) => {
                if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
                dispatch(appActions.setAppError('Не удалось установить адрес доставки. Попробуйте пожалуйста ещё раз'));
            });
    };

    const createDeliveryBasket = (companyId, newUserAddressId) => {
        apiService.getBasketIdDelivery(accessToken, companyId, deliveryAddressModel, newUserAddressId || addressId, isAuth)
            .then((res) => {
                const nextBasket = res.data.data;
                const currentOrganization = organizationsList.find((o) => o.id === companyId);
                batch(() => {
                    dispatch(updateBasket(mapBasketResToModel(nextBasket)));
                    dispatch(organizationActions.setOrganizationData(currentOrganization));
                });
            })
            .catch((err) => {
                if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
                dispatch(appActions.setAppError('Не удалось зарегистрировать корзину. Попробуйте пожалуйста ещё раз'));
            });
    };

    apiService.getCurrentOrganization(deliveryAddressModel)
        .then((organisationResult) => {
            const companyId = organisationResult.data.company_id;

            if (!companyId) { dispatch(appActions.showNoOrganizationModal(true)); return; }

            if (isAuth && !deliveryAddressModel.id) {
                apiService.getAddressId(accessToken, deliveryAddressModel)
                    .then((userAddressResult) => {
                        const newUserAddressId = userAddressResult.data.id;
                        dispatch(getUserAddresses());

                        if (cartId) {
                            patchDeliveryBasket(companyId, newUserAddressId, currentPromoCode);
                        } else {
                            createDeliveryBasket(companyId, newUserAddressId);
                        }
                    })
                    .catch((err) => {
                        if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
                        dispatch(appActions.setAppError('Не удалось идентифицировать адрес. Попробуйте пожалуйста ещё раз'));
                    });
                return;
            }

            if (cartId) {
                patchDeliveryBasket(companyId, null, currentPromoCode);
            } else {
                createDeliveryBasket(companyId);
            }
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(appActions.setAppError('Не удалось найти обслуживающую организацию. Попробуйте пожалуйста ещё раз'));
        });
};

export const setPickup = (pickupId, newPromoCode) => (dispatch, getState, createApiService) => {
    const apiService = createApiService(getState);

    const isAuth = _.get(getState(), 'app.isAuth');
    const accessToken = _.get(getState(), 'app.accessToken');
    const currentBasket = _.get(getState(), 'basket.currentBasket');
    const organizationsList = _.get(getState(), 'organization.organizationsList', []);
    const organizationData = _.get(getState(), 'organization.organizationData');
    const isStage = _.get(getState(), 'app.isStage');

    const { is_working, id: organizationId } = organizationData;
    const isSleep = organizationId && !is_working && isStage;

    if (isSleep) {
        dispatch(appActions.showSleepModal(true));
        return;
    }

    const { cartId, promoCode } = currentBasket;
    const isNeedToApplyPromoCode = typeof newPromoCode !== 'undefined';
    const currentPromoCode = isNeedToApplyPromoCode ? newPromoCode : promoCode;

    if (cartId) {
        apiService.patchPickupBasket(accessToken, cartId, pickupId, isAuth, currentPromoCode)
            .then((basketResult) => {
                const nextBasket = basketResult.data.data;
                const nextOrganization = organizationsList.find((o) => o.id === nextBasket.company_id);
                batch(() => {
                    dispatch(updateBasket(mapBasketResToModel(nextBasket)));
                    dispatch(organizationActions.setOrganizationData(nextOrganization));
                });
            })
            .catch((err) => {
                if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
                dispatch(appActions.setAppError('Не удалось установить адрес самовывоза. Попробуйте пожалуйста ещё раз'));
            });
    } else {
        apiService.getBasketIdPickup(accessToken, pickupId, isAuth)
            .then((basketResult) => {
                const nextBasket = basketResult.data.data;
                const nextOrganization = organizationsList.find((o) => o.id === nextBasket.company_id);
                batch(() => {
                    dispatch(updateBasket(mapBasketResToModel(nextBasket)));
                    dispatch(organizationActions.setOrganizationData(nextOrganization));
                });
            })
            .catch((err) => {
                if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
                dispatch(appActions.setAppError('Не удалось зарегистрировать корзину. Попробуйте пожалуйста ещё раз'));
            });
    }
};
