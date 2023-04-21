import axios from 'axios';
import Types from './types';
import AppConfig from '../config';

const envCitiesHost = process.env.REACT_APP_CITIES_HOST;
const { deliveryTypesMap } = Types;

class ApiService {
    constructor(baseUrl) {
        this.baseApi = `https://${baseUrl}.${AppConfig.apiDomain}-ybdyb.ru/api/v1/`;
    }

    authUser = 'auth/users';

    currentUserData = 'auth/user';

    refreshToken = 'auth/refreshToken';

    authorizationCode = 'auth/sendSmsCode';

    authorizationKeys = 'auth/verifySmsCode';

    authLogout = 'auth/logout';

    groups = 'city/groups';

    items = 'product';

    newBasket = 'cart';

    basketData = 'carts/';

    basketItems = '/items/';

    cities = 'cities';

    organizations = 'companies';

    organizationsAt = 'company/address';

    addressHint = 'daData/addresses';

    sliders = '/sliders';

    gifts = 'gifts';

    carts = 'carts/';

    order = '/order';

    sum = 'carts/orders/sum';

    userAddresses = 'user/addresses';

    deliverySlots = 'delivery-slots';

    userOrders = 'user/orders';

    getNewToken = async (token, refreshToken) => await axios.post(this.baseApi + this.refreshToken, {
        refreshToken,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    getUserData = async (phone) => await axios.post(this.baseApi + this.authUser, {
        phone,
    });

    getCurrentUserData = async (token) => await axios.get(this.baseApi + this.currentUserData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    getAuthorizationCode = async (phoneNumber, captchaToken) => await axios.post(this.baseApi + this.authorizationCode, {
        phoneNumber,
        captchaToken,
    });

    getAuthorizationKeys = async (phoneNumber, smsCode) => await axios.post(this.baseApi + this.authorizationKeys, {
        phoneNumber,
        smsCode,
    });

    logout = async (token) => await axios.post(this.baseApi + this.authLogout, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    getGroups = async (token, cityId) => await axios.get(this.baseApi + this.groups, {
        params: {
            'filter[city]': cityId,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    getCurrentBasket = async (cartId) => await axios.get(this.baseApi + this.basketData + cartId, {});

    getGroupsItems = async (token, city, groupId, companyId) => await axios.get(this.baseApi + this.items, {
        params: {
            'filter[city]': city,
            'filter[group][]': groupId,
            'filter[company]': companyId,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    patchDeliveryBasket = async (token, cartId, companyId, address, addressId, isAuth, promoCode) => await axios.patch(this.baseApi + this.basketData + cartId, {
        company_id: companyId,
        delivery_type: deliveryTypesMap.get('delivery').value,
        delivery_address: address,
        address_id: addressId,
        promo_code: promoCode,
    }, isAuth ? {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    } : {});

    patchPickupBasket = async (token, cartId, companyId, isAuth, promoCode) => await axios.patch(this.baseApi + this.basketData + cartId, {
        company_id: companyId,
        delivery_type: deliveryTypesMap.get('pickup').value,
        promo_code: promoCode,
    }, isAuth ? {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    } : {});

    getBasketIdDelivery = async (token, companyId, address, addressId, isAuth) => await axios.post(this.baseApi + this.newBasket, {
        company_id: companyId,
        delivery_type: deliveryTypesMap.get('delivery').value,
        delivery_address: address,
        address_id: addressId,
    }, isAuth ? {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    } : {});

    getBasketIdPickup = async (token, companyId, isAuth) => await axios.post(this.baseApi + this.newBasket, {
        company_id: companyId,
        delivery_type: deliveryTypesMap.get('pickup').value,
    }, isAuth ? {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    } : {});

    addBasketProduct = async (token, cartId, productId, quantity, isAuth) => await axios.post(
        this.baseApi + this.basketData + cartId + this.basketItems, {
            product_id: productId,
            quantity,
        },
        isAuth ? {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        } : {},
    );

    editBasketProduct = async (token, cartId, productId, quantity, isAuth) => await axios.patch(
        this.baseApi + this.basketData + cartId + this.basketItems + productId, {
            product_id: productId,
            quantity,
        },
        isAuth ? {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        } : {},
    );

    deleteBasketProduct = async (token, basketId, itemId, isAuth) => await axios.delete(
        this.baseApi + this.basketData + basketId + this.basketItems + itemId, isAuth ? {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        } : {},
    );

    getCitiesList = async () => await axios.get(`https://${envCitiesHost || ''}/api/${this.cities}`);

    getOrganizations = async () => await axios.get(this.baseApi + this.organizations);

    getAddressHint = async (key = '') => await axios.get(this.baseApi + this.addressHint, {
        params: {
            'filter[text]': key,
        },
    });

    getSliders = async () => await axios.get(this.baseApi + this.cities + this.sliders);

    getCurrentOrganization = async (address) => await axios.get(this.baseApi + this.organizationsAt, {
        params: {
            address: address.address,
            homeNumber: address.homeNumber,
            building: address.building,
            entrance: address.entrance,
            floor: address.floor,
            apartment: address.apartment,
            intercom: address.intercom,
            comment: address.comment,
        },
    });

    getGifts = async (companyId) => await axios.get(this.baseApi + this.gifts, {
        params: {
            'filter[company]': companyId,
        },
    });

    createOrder = async (
        token,
        cartId,
        giftId,
        userName,
        comment,
        payType,
        personCount,
        birthday,
        change,
        zoneId,
        deliveryTime,
        promoCode,
    ) => await axios.post(this.baseApi + this.carts + cartId + this.order, {
        gift_id: giftId,
        user_name: userName,
        comment,
        pay_type: payType,
        person_count: personCount,
        birthday,
        change,
        zone_id: zoneId,
        delivery_at: deliveryTime,
        promo_code: promoCode,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    getTotalSum = async (
        token,
        cartId,
        giftId,
        payType,
        personCount,
        birthday,
        comment,
        change,
        promoCode,
    ) => await axios.post(this.baseApi + this.sum, {
        cart_id: cartId,
        gift_id: giftId,
        pay_type: payType,
        person_count: personCount,
        birthday,
        comment,
        change,
        promo_code: promoCode,
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    getUserAddresses = async (token) => await axios.get(this.baseApi + this.userAddresses, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    deleteUserAddress = async (token, addressId) => await axios.delete(`${this.baseApi + this.userAddresses}/${addressId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    getAddressId = async (token, addressModel) => await axios.post(this.baseApi + this.userAddresses, addressModel, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    getDeliverySlots = async (companyId) => await axios.get(`${this.baseApi + this.organizations}/${companyId}/${this.deliverySlots}`);

    getUserOrders = async (token, status) => await axios.get(this.baseApi + this.userOrders, {
        params: {
            'filter[status]': status,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export default ApiService;
