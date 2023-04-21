import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CurrentBasketModel from '../models/current-basket';

export const pad = (num, size) => {
    let stringNUm = num.toString();
    while (stringNUm.length < size) stringNUm = `0${num}`;
    return stringNUm;
};

export const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return null;
};

export const mapBasketResToModel = (res) => {
    const {
        address_id,
        company_id,
        delivery_address,
        delivery_type,
        promo_code,
        user_id,
        cart_product,
        delivery_address_classified,
        cart_id,
        address,
        apartment,
        building,
        comment,
        entrance,
        floor,
        homeNumber,
        intercom,
        deliveryCost,
        diffCost,
        excludeDelivery,
    } = res;

    return new CurrentBasketModel({
        addressId: address_id,
        companyId: company_id,
        deliveryAddress: delivery_address,
        deliveryType: delivery_type,
        promoCode: promo_code,
        userId: user_id,
        cartProduct: cart_product,
        deliveryAddressClassified: delivery_address_classified,
        cartId: cart_id,
        address: address ? String(address) : '',
        apartment: apartment ? String(apartment) : '',
        building: building ? String(building) : '',
        comment: comment ? String(comment) : '',
        entrance: entrance ? String(entrance) : '',
        floor: floor ? String(floor) : '',
        homeNumber: homeNumber ? String(homeNumber) : '',
        intercom: intercom ? String(intercom) : '',
        deliveryCost: deliveryCost || 0,
        diffCost: diffCost || 0,
        excludeDelivery: Boolean(excludeDelivery),
    });
};

export const gaDataLayerPush = (event, data) => {
    if (!event) return;
    console.log(event, data);
    const dataLayer = window.dataLayer || [];
    dataLayer.push({ event, ...data });
};

export const getProductsMapByGroups = (groups) => groups.reduce((acc, group) => {
    return group.items.reduce((itemsAcc, product) => itemsAcc.set(product.id, { ...product, groupName: group.name }), acc);
}, new Map());
