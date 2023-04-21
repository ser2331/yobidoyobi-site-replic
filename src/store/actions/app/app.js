import * as _ from 'lodash';
import { app as appActions, basket as basketActions } from '../index';
import CityModel from '../../../models/city-model';
import UserDataModel from '../../../models/user-data-model';
import TokenModel from '../../../models/token-model';
import Types from '../../../classes/types';
import DeliveryAddressModel from '../../../models/delivery-address-model';

const { deliveryTypesMap } = Types;

export const APP_SET_SIZE = 'APP_SET_SIZE';
export const APP_SHOW_AUTH = 'APP_SHOW_AUTH';
export const APP_SET_TOKEN = 'APP_SET_TOKEN';
export const APP_LOG_OUT = 'APP_LOG_OUT';
export const APP_SHOW_CALL_ME = 'APP_SHOW_CALL_ME';
export const APP_SHOW_DIRECTORS_FEEDBACK = 'APP_SHOW_DIRECTORS_FEEDBACK';
export const APP_SHOW_TABLET_MENU = 'APP_SHOW_TABLET_MENU';
export const APP_SHOW_CITY_MODAL = 'APP_SHOW_CITY_MODAL';
export const APP_SHOW_ADDRESS_MODAL = 'APP_SHOW_ADDRESS_MODAL';
export const APP_SHOW_GIFT_MODAL = 'APP_SHOW_GIFT_MODAL';
export const APP_SHOW_ORDER_AMOUNT_MODAL = 'APP_SHOW_ORDER_AMOUNT_MODAL';
export const APP_SHOW_SLEEP_MODAL = 'APP_SHOW_SLEEP_MODAL';
export const APP_SET_CITY = 'APP_SET_CITY';
export const APP_SET_CITIES_LIST = 'APP_SET_CITIES_LIST';
export const APP_READY = 'APP_READY';
export const APP_SET_USER_DATA = 'APP_SET_USER_DATA';
export const APP_SET_CURRENT_USER_DATA = 'APP_SET_CURRENT_USER_DATA';
export const APP_SET_SLIDERS = 'APP_SET_SLIDERS';
export const APP_SHOW_NO_ORGANIZATION_MODAL = 'APP_SHOW_NO_ORGANIZATION_MODAL';
export const ERROR_AUTHORIZATION_KEYS = 'ERROR_AUTHORIZATION_KEYS';
export const APP_ERROR = 'APP_ERROR';

export const setSize = (payload = '') => ({
    type: APP_SET_SIZE,
    payload,
});

export const showAuth = (payload = false) => ({
    type: APP_SHOW_AUTH,
    payload,
});

export const setToken = (payload = {}) => ({
    type: APP_SET_TOKEN,
    payload,
});

export const appLogout = () => ({
    type: APP_LOG_OUT,
});

export const setAppError = (payload = '') => ({
    type: APP_ERROR,
    payload,
});

export const logout = () => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken', '');

    createApiService(getState).logout(accessToken)
        .then(() => dispatch(appLogout()))
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(setAppError('Не удалось выйти. Попробуйте пожалуйста ещё раз'));
        });
};

export const showCallMe = (payload = false) => ({
    type: APP_SHOW_CALL_ME,
    payload,
});

export const showDirectorsFeedback = (payload = false) => ({
    type: APP_SHOW_DIRECTORS_FEEDBACK,
    payload,
});

export const showGadgetMenu = (payload = false) => ({
    type: APP_SHOW_TABLET_MENU,
    payload,
});

export const showCityModal = (payload = false) => ({
    type: APP_SHOW_CITY_MODAL,
    payload,
});

export const showAddressModal = (payload = false) => ({
    type: APP_SHOW_ADDRESS_MODAL,
    payload,
});

export const showGiftModal = (payload = false) => ({
    type: APP_SHOW_GIFT_MODAL,
    payload,
});

export const showOrderAmountModal = (payload = false) => ({
    type: APP_SHOW_ORDER_AMOUNT_MODAL,
    payload,
});

export const showSleepModal = (payload = false) => ({
    type: APP_SHOW_SLEEP_MODAL,
    payload,
});

export const setUserData = (payload = null) => ({
    type: APP_SET_USER_DATA,
    payload,
});

export const setCurrentUserData = (payload = null) => ({
    type: APP_SET_CURRENT_USER_DATA,
    payload,
});

export const getNewToken = () => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken', '');
    const refreshToken = _.get(getState(), 'app.refreshToken', '');

    createApiService(getState).getNewToken(accessToken, refreshToken)
        .then((res) => {
            dispatch(setToken(res.data.data));
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(setAppError('Не удалось аторизоваться. Попробуйте пожалуйста ещё раз'));
        });
};

export const getUserData = (phone) => (dispatch, getState, createApiService) => {
    createApiService(getState).getUserData(phone)
        .then(() => {
            dispatch(setUserData(new UserDataModel({ unverifiedPhone: phone })));
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(setAppError('Не удалось получить данные пользователя. Попробуйте пожалуйста ещё раз'));
        });
};

export const getCurrentUserData = () => (dispatch, getState, createApiService) => {
    const accessToken = _.get(getState(), 'app.accessToken', '');
    const currentBasket = _.get(getState(), 'basket.currentBasket');

    const { cartId, userId, deliveryType, companyId, addressId, address, apartment, building, comment, entrance, floor, homeNumber, intercom } = currentBasket;
    const isDelivery = deliveryType === deliveryTypesMap.get('delivery').value;

    createApiService(getState).getCurrentUserData(accessToken)
        .then((res) => {
            const currentUserData = res.data.data;
            dispatch(setCurrentUserData(currentUserData));

            if (cartId && !userId) {
                if (isDelivery) {
                    dispatch(basketActions.setDelivery({
                        id: addressId, addressId, address, apartment, building, comment, entrance, floor, homeNumber, intercom,
                    }));
                } else {
                    dispatch(basketActions.setPickup(companyId));
                }
            }
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(setAppError('Не удалось получить личные данные пользователя. Попробуйте пожалуйста ещё раз'));
        });
};

export const getAuthorizationCode = (phoneNumber, captchaToken) => (dispatch, getState, createApiService) => {
    createApiService(getState).getAuthorizationCode(phoneNumber, captchaToken)
        .then(() => {})
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(setAppError('Не удалось выслать СМС-код. Попробуйте пожалуйста ещё раз'));
        });
};

export const errorAuthorizationKeys = (payload) => ({
    type: ERROR_AUTHORIZATION_KEYS,
    payload,
});

export const getAuthorizationKeys = (phoneNumber, smsCode) => (dispatch, getState, createApiService) => {
    const currentBasket = _.get(getState(), 'basket.currentBasket');

    const { deliveryType, cartId, apartment, entrance, floor, address, intercom, comment, homeNumber, building } = currentBasket;
    const isDelivery = deliveryType === deliveryTypesMap.get('delivery').value;

    createApiService(getState).getAuthorizationKeys(phoneNumber, smsCode)
        .then((res) => {
            dispatch(setToken(new TokenModel(res.data.data)));
            dispatch(basketActions.getUserAddresses());
            if (isDelivery && cartId) {
                const deliveryAddressModel = new DeliveryAddressModel({
                    address: address || '',
                    homeNumber: homeNumber || '',
                    building: building || '',
                    apartment: apartment || '',
                    entrance: entrance || '',
                    floor: floor || '',
                    intercom: intercom || '',
                    comment: comment || '',
                });
                dispatch(basketActions.setDelivery(deliveryAddressModel));
            }
        })
        .catch((err) => {
            dispatch(errorAuthorizationKeys(err.message));
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(setAppError('Введен неверный код. Попробуйте пожалуйста ещё раз'));
        });
};

export const setCity = (payload = new CityModel()) => ({
    type: APP_SET_CITY,
    payload,
});

export const setCitiesList = (payload = []) => ({
    type: APP_SET_CITIES_LIST,
    payload: payload.map((item) => new CityModel(item)),
});

export const setAppReady = (payload = false) => ({
    type: APP_READY,
    payload,
});

export const setSliders = (payload = false) => ({
    type: APP_SET_SLIDERS,
    payload,
});

export const getSliders = () => (dispatch, getState, createApiService) => {
    createApiService(getState).getSliders()
        .then((res) => {
            dispatch(setSliders(res.data.data));
        })
        .catch((err) => {
            if (err.response.status === 401) { dispatch(appActions.appLogout()); return; }
            dispatch(setAppError('Не удалось получить список слайдов. Попробуйте пожалуйста ещё раз'));
        });
};

export const showNoOrganizationModal = (payload) => ({
    type: APP_SHOW_NO_ORGANIZATION_MODAL,
    payload,
});
